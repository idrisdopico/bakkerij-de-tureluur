'use server';

import { headers } from 'next/headers';

import { isOrderingOpen } from '@/lib/dates/ordering-window';
import { pickupDayLabel } from '@/lib/dates/pickup-dates';

import { getBestellen, getProductsByIds } from '../lib/content';
import { sendEmail } from '../lib/email';
import { decrementProductStock } from '../lib/stock';
import { verifyTurnstile } from '../lib/turnstile';
import type { SubmitOrderInput, SubmitOrderResult } from './order-types';

// Bounds that keep a submission (and the resulting email) sane, and stop a
// tampered client from sending something enormous.
const MAX_ITEMS = 100;
const MAX_QUANTITY = 99;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_NOTES = 2000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR =
  'Er ging iets mis bij het versturen van je bestelling. Probeer het later opnieuw.';

// Collapse any CR/LF so single-line fields can't inject email headers or break
// the plain-text body.
const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

/**
 * Receives a cart + customer details from the checkout form and emails the
 * bakery. The server is the source of truth: it re-verifies the human (via
 * Turnstile), re-derives product data from Payload by id (never trusting the
 * client's names), and only ever sends to the fixed `ORDER_TO_EMAIL` — so the
 * form can't be abused as an open relay. Returns a plain result object rather
 * than throwing, so the client can show a friendly message.
 */
export async function submitOrder(
  input: SubmitOrderInput,
): Promise<SubmitOrderResult> {
  // This is a public server action — the argument's TypeScript type is only a
  // hint, not a runtime guarantee. Re-validate the payload shape before
  // touching any field, so a malformed/tampered request fails closed into a
  // friendly result instead of throwing a raw 500 on `.trim()` of a non-string.
  const raw = input as unknown as Partial<
    Record<keyof SubmitOrderInput, unknown>
  >;
  if (
    typeof raw.name !== 'string' ||
    typeof raw.email !== 'string' ||
    typeof raw.phone !== 'string' ||
    typeof raw.pickupDay !== 'string' ||
    typeof raw.notes !== 'string' ||
    typeof raw.turnstileToken !== 'string' ||
    typeof raw.honeypot !== 'string' ||
    !Array.isArray(raw.items)
  ) {
    return { ok: false, error: GENERIC_ERROR };
  }

  // Honeypot: a hidden field no real user ever fills.
  if (input.honeypot.trim() !== '') {
    return { ok: false, error: GENERIC_ERROR };
  }

  const headerList = await headers();
  const remoteIp = headerList.get('x-forwarded-for')?.split(',')[0]?.trim();
  const isHuman = await verifyTurnstile({
    token: input.turnstileToken,
    remoteIp,
  });
  if (!isHuman) {
    return {
      ok: false,
      error:
        'We konden niet bevestigen dat je geen robot bent. Ververs de pagina en probeer het opnieuw.',
    };
  }

  const name = singleLine(input.name);
  const email = singleLine(input.email).toLowerCase();
  const phone = singleLine(input.phone);
  const pickupDay = singleLine(input.pickupDay);
  const notes = input.notes.trim();

  if (name.length === 0 || name.length > MAX_NAME) {
    return { ok: false, error: 'Vul je naam in.' };
  }
  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL) {
    return { ok: false, error: 'Vul een geldig e-mailadres in.' };
  }
  if (phone.length > MAX_PHONE) {
    return { ok: false, error: 'Je telefoonnummer is te lang.' };
  }
  if (notes.length > MAX_NOTES) {
    return { ok: false, error: 'Je opmerking is te lang.' };
  }

  if (!Array.isArray(input.items) || input.items.length === 0) {
    return { ok: false, error: 'Je bestelling is leeg.' };
  }
  if (input.items.length > MAX_ITEMS) {
    return {
      ok: false,
      error: 'Je bestelling bevat te veel verschillende producten.',
    };
  }

  // Sum quantities per product id, validating each entry.
  const quantityByProductId = new Map<number, number>();
  for (const item of input.items) {
    if (
      !Number.isInteger(item.productId) ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > MAX_QUANTITY
    ) {
      return { ok: false, error: GENERIC_ERROR };
    }
    quantityByProductId.set(
      item.productId,
      (quantityByProductId.get(item.productId) ?? 0) + item.quantity,
    );
  }

  const settings = await getBestellen();
  if (!settings.ordersEnabled) {
    return {
      ok: false,
      error: 'Online bestellen is momenteel uitgeschakeld.',
    };
  }
  // Time window (authoritative — the client also hides ordering, but a stale
  // page could still submit): closed weekends and Monday before 12:00.
  if (!isOrderingOpen()) {
    return {
      ok: false,
      error:
        'Online bestellen is nu gesloten. Je kunt bestellen van maandag 12:00 tot en met vrijdag.',
    };
  }
  const allowedDays = settings.pickupDays.map(entry => entry.day);
  if (!allowedDays.includes(pickupDay)) {
    return { ok: false, error: 'Kies een geldige afhaaldag.' };
  }

  // Re-derive product data from the database — the email is built from this,
  // not from anything the client sent.
  const productIds = [...quantityByProductId.keys()];
  const products = await getProductsByIds(productIds);
  if (products.length !== productIds.length) {
    return {
      ok: false,
      error:
        'Sommige producten zijn niet meer beschikbaar. Ververs de pagina en probeer het opnieuw.',
    };
  }
  const productById = new Map(products.map(product => [product.id, product]));

  // Enforce the CMS rules server-side — the client hides the order button for
  // unavailable/sold-out products and caps quantities at the stock it knew at
  // page load, but the server is the authority and re-checks against current
  // stock (which may have dropped since the page was loaded).
  for (const id of productIds) {
    const product = productById.get(id);
    const quantity = quantityByProductId.get(id) ?? 0;
    if (!product || product.beschikbaar === false) {
      return {
        ok: false,
        error:
          'Sommige producten zijn niet meer beschikbaar. Ververs de pagina en probeer het opnieuw.',
      };
    }
    if (typeof product.voorraad === 'number') {
      if (product.voorraad <= 0) {
        return {
          ok: false,
          error: `${product.naam} is uitverkocht. Ververs de pagina en probeer het opnieuw.`,
        };
      }
      if (quantity > product.voorraad) {
        return {
          ok: false,
          error: `Van ${product.naam} ${
            product.voorraad === 1
              ? 'is er nog maar 1'
              : `zijn er nog maar ${product.voorraad}`
          } beschikbaar.`,
        };
      }
    }
  }

  const itemLines = productIds.map(id => {
    const product = productById.get(id);
    const quantity = quantityByProductId.get(id) ?? 0;
    const weight = product?.gewicht ? ` (${product.gewicht})` : '';
    return `- ${quantity}× ${product?.naam ?? 'Onbekend product'}${weight}`;
  });

  const text = [
    'Nieuwe bestelling via de website.',
    '',
    'Producten:',
    ...itemLines,
    '',
    // Resolve the day name to the actual upcoming date server-side, so the
    // bakery reads "Zaterdag 26 september", not an ambiguous "Zaterdag".
    `Afhaaldag: ${pickupDayLabel(pickupDay, 'long')}`,
    '',
    'Klantgegevens:',
    `Naam: ${name}`,
    `E-mail: ${email}`,
    `Telefoon: ${phone || '(niet opgegeven)'}`,
    '',
    'Opmerking:',
    notes || '(geen)',
  ].join('\n');

  const to = process.env.ORDER_TO_EMAIL || process.env.SMTP_USER;
  if (!to) {
    return { ok: false, error: GENERIC_ERROR };
  }

  // In production, refuse to report success when no real mail transport is
  // configured. Without SMTP credentials Payload's adapter is unset and it
  // only logs the email to the console (fine for local dev) — but then the
  // customer would see "sent" while the bakery never receives the order. Fail
  // loudly instead of losing the order silently.
  const isSmtpConfigured = Boolean(
    process.env.SMTP_USER && process.env.SMTP_PASS,
  );
  if (process.env.NODE_ENV === 'production' && !isSmtpConfigured) {
    console.error(
      '[order] SMTP is not configured in production — order email was not sent.',
    );
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    await sendEmail({
      to,
      replyTo: email,
      subject: `Nieuwe bestelling — ${name}`,
      text,
    });
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }

  // The order has reached the bakery — now subtract what was ordered from each
  // product's stock (clamped at 0). Best-effort and deliberately after the
  // email: if this write fails the order still stands, so we log and move on
  // rather than failing the customer over stock bookkeeping.
  const stockUpdates = productIds
    .map(id => {
      const product = productById.get(id);
      if (!product || typeof product.voorraad !== 'number') {
        return null;
      }
      const quantity = quantityByProductId.get(id) ?? 0;
      return { id, voorraad: Math.max(0, product.voorraad - quantity) };
    })
    .filter((update): update is { id: number; voorraad: number } => {
      return update !== null;
    });
  try {
    await decrementProductStock(stockUpdates);
  } catch {
    console.error('[order] Order placed but stock update failed.');
  }

  return { ok: true };
}
