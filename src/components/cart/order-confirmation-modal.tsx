'use client';

import { Check } from 'lucide-react';
import { useId, useRef } from 'react';

import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { useFocusTrap } from '@/hooks/use-focus-trap';

import { Button } from '../button';
import styles from './order-confirmation-modal.module.scss';

export type OrderConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Shown only after an order email was sent successfully. A plain confirmation
 * — there's no automatic reply email, so this is the customer's receipt that
 * the bakery received the order.
 */
export function OrderConfirmationModal({
  isOpen,
  onClose,
}: OrderConfirmationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, onClose);
  useFocusTrap({ ref: dialogRef, isActive: isOpen });

  return (
    <div className={styles.root} data-open={isOpen} inert={!isOpen}>
      {/* Mouse convenience only — keyboard users close via Esc or the button,
          so it's hidden from assistive tech and out of the tab order. */}
      <button
        type="button"
        className={styles.backdrop}
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}>
        <span className={styles.icon} aria-hidden="true">
          <Check size={28} strokeWidth={2.5} />
        </span>
        <h2 id={titleId} className={styles.title}>
          Bedankt voor je bestelling!
        </h2>
        <p className={styles.text}>
          We hebben je bestelling per e-mail ontvangen. Je krijgt geen
          automatische bevestiging, maar we nemen contact op als er iets
          onduidelijk is. Vergeet niet je bestelling op tijd op te halen.
        </p>
        <Button variant="primary" className={styles.button} onClick={onClose}>
          Sluiten
        </Button>
      </div>
    </div>
  );
}
