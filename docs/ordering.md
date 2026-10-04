# Ordering (cart → order email)

Customers fill a basket ("bestelling") and submit it; the bakery receives the
order as an **email**. No order record is stored — the order _is_ the email, and
there's no automatic customer confirmation (the modal says so). The only thing
an order writes back is per-product **stock** (`voorraad`), decremented after
the email is sent.

## Client (all `'use client'`, under `src/components/cart/`)

- `cart-context.tsx` — cart state in React context, persisted to `localStorage`
  (key `bakkerij-de-tureluur-cart`; carts >7 days old discarded; quantity capped
  at remaining stock, then 99). Exposes `isOrderingEnabled` = CMS flag **AND**
  live time window.
- `cart-button`, `add-to-cart-button`, `cart-drawer`, `checkout-form`,
  `turnstile-widget`, `order-confirmation-modal`, `cart-overlay`,
  `ordering-closed-notice`.
- The checkout form sends only `{ productId, quantity }` + customer fields —
  **never product names or prices**.

## Server action — `src/backend/actions/submit-order.ts`

This is a public endpoint, so its TypeScript argument type is only a hint. It is
the source of truth and re-does everything client-side:

1. Re-validates the payload shape at runtime; checks the honeypot.
2. Checks the **time window** (`isOrderingOpen()`) — before the outbound
   Turnstile call, since it's free.
3. Re-verifies **Turnstile** server-side (`lib/turnstile.ts`, fails closed).
4. Strips CR/LF from single-line fields (email-header-injection defence), bounds
   every field and quantity.
5. Re-checks the CMS `ordersEnabled` flag and validates `pickupDay` against the
   `bestellen` allow-list.
6. **Re-derives product data from Payload by id** — the email is built from DB
   data, never client input — rejecting switched-off, sold-out, or
   over-stock items.
7. Sends only to the fixed `ORDER_TO_EMAIL` (never a customer address), so it
   can't be used as an open relay. Returns `{ ok }` instead of throwing.
8. **After** the email, decrements each product's `voorraad` (best-effort,
   clamped at 0) via `lib/stock.ts`.

In production with no SMTP configured it **fails loudly** rather than reporting
a success Payload would only console-log — so an order is never silently lost.

## Availability, stock, and the time window

- `beschikbaar` (manual on/off) and `voorraad` (weekly stock, set by hand each
  Monday, no auto-reset) are per-product. At 0 the card shows "Uitverkocht"; off
  shows "Tijdelijk niet beschikbaar". Both only "off" on explicit `false`/`0`.
- **Time window** (`src/lib/dates/ordering-window.ts`): closed all
  weekend and Monday before 12:00, open Monday 12:00 → Friday, anchored to
  Amsterdam time. Hardcoded (not a CMS setting). Evaluated live on the client
  (`use-ordering-open.ts`) and again authoritatively in the action.
- Ordering is closed whenever **any** of these say so: the CMS `ordersEnabled`
  flag, the time window, or (per product) `beschikbaar`/`voorraad`.

## Enabling / disabling ordering

- **Kill switch:** `/admin` → **Bestelinstellingen** → "Bestellen ingeschakeld".
- **Required env for emails to send:** `SMTP_USER` + `SMTP_PASS` (a Gmail App
  Password) and the Turnstile keys. See [deployment.md](./deployment.md). Until
  SMTP is set, ordering is best turned off so customers don't hit the failure
  path.
