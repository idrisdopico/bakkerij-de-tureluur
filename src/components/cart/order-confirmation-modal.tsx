'use client';

import { Check } from 'lucide-react';
import { useId } from 'react';

import { Button } from '../button';
import { Dialog } from '../dialog';
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
  const titleId = useId();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      labelledBy={titleId}
      align="center"
      panelClassName={styles.dialog}>
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
    </Dialog>
  );
}
