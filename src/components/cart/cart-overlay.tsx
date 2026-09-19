'use client';

import { useState } from 'react';

import { CartDrawer } from './cart-drawer';
import { OrderConfirmationModal } from './order-confirmation-modal';

export type CartOverlayProps = {
  pickupDays: string[];
  pickupPolicy: string;
};

/**
 * Renders the cart drawer and the success modal together and owns the
 * confirmation state between them — the drawer's checkout triggers the modal
 * on a successful send. Kept out of the cart context so that context stays
 * purely about the basket.
 */
export function CartOverlay({ pickupDays, pickupPolicy }: CartOverlayProps) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  return (
    <>
      <CartDrawer
        pickupDays={pickupDays}
        pickupPolicy={pickupPolicy}
        onOrderSuccess={() => setIsConfirmationOpen(true)}
      />
      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      />
    </>
  );
}
