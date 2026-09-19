'use client';

import { type FormEvent, useCallback, useId, useState } from 'react';

import { submitOrder } from '@/backend/actions/submit-order';

import { Button } from '../button';
import { useCart } from './cart-context';
import styles from './checkout-form.module.scss';
import { TurnstileWidget } from './turnstile-widget';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export type CheckoutFormProps = {
  pickupDays: string[];
  pickupPolicy: string;
  /** Called after a successful send, so the parent can show confirmation. */
  onOrderSuccess: () => void;
};

/**
 * The order form inside the cart drawer. Collects the customer's details and
 * pickup day, verifies a Turnstile token, and hands everything to the
 * `submitOrder` server action. On success it clears the cart, closes the
 * drawer, and asks the parent to show the confirmation modal; on failure it
 * keeps the cart intact and shows an inline error so the customer can retry.
 */
export function CheckoutForm({
  pickupDays,
  pickupPolicy,
  onOrderSuccess,
}: CheckoutFormProps) {
  const { items, clear, close } = useCart();
  const fieldId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDay, setPickupDay] = useState(pickupDays[0] ?? '');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  // Bumped on a failed submit to remount Turnstile — its tokens are single-use.
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerify = useCallback(
    (token: string) => setTurnstileToken(token),
    [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Je winkelmandje is leeg.');
      return;
    }
    if (!turnstileToken) {
      setErrorMessage('Bevestig even dat je geen robot bent.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitOrder({
      name,
      email,
      phone,
      pickupDay,
      notes,
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      turnstileToken,
      honeypot,
    });

    if (result.ok) {
      clear();
      close();
      onOrderSuccess();
      return;
    }

    setErrorMessage(result.error);
    setTurnstileToken('');
    setTurnstileKey(key => key + 1);
    setIsSubmitting(false);
  };

  const isDisabled = isSubmitting || items.length === 0 || !SITE_KEY;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${fieldId}-name`}>
          Naam
        </label>
        <input
          id={`${fieldId}-name`}
          className={styles.input}
          type="text"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${fieldId}-email`}>
          E-mailadres
        </label>
        <input
          id={`${fieldId}-email`}
          className={styles.input}
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${fieldId}-phone`}>
          Telefoonnummer <span className={styles.optional}>(optioneel)</span>
        </label>
        <input
          id={`${fieldId}-phone`}
          className={styles.input}
          type="tel"
          name="phone"
          autoComplete="tel"
          maxLength={40}
          value={phone}
          onChange={event => setPhone(event.target.value)}
        />
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Afhaaldag</legend>
        <div className={styles.radioGroup}>
          {pickupDays.map(day => (
            <label key={day} className={styles.radioLabel}>
              <input
                type="radio"
                name="pickupDay"
                value={day}
                checked={pickupDay === day}
                onChange={() => setPickupDay(day)}
                required
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
        {pickupPolicy && <p className={styles.policy}>{pickupPolicy}</p>}
      </fieldset>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${fieldId}-notes`}>
          Opmerking <span className={styles.optional}>(optioneel)</span>
        </label>
        <textarea
          id={`${fieldId}-notes`}
          className={styles.textarea}
          name="notes"
          rows={3}
          maxLength={2000}
          value={notes}
          onChange={event => setNotes(event.target.value)}
        />
      </div>

      {/* Honeypot: hidden from real users; a filled value marks a bot. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${fieldId}-company`}>Laat dit veld leeg</label>
        <input
          id={`${fieldId}-company`}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={event => setHoneypot(event.target.value)}
        />
      </div>

      {SITE_KEY ? (
        <TurnstileWidget
          key={turnstileKey}
          siteKey={SITE_KEY}
          onVerify={handleVerify}
        />
      ) : (
        <p className={styles.configWarning}>
          Bestellen is momenteel niet beschikbaar. Neem contact met ons op via
          e-mail.
        </p>
      )}

      {errorMessage && (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        className={styles.submit}
        disabled={isDisabled}>
        {isSubmitting ? 'Versturen…' : 'Bestelling versturen'}
      </Button>
    </form>
  );
}
