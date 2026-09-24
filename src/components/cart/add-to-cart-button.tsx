'use client';

import { Plus } from 'lucide-react';

import { Button } from '../button';
import styles from './add-to-cart-button.module.scss';
import { useCart } from './cart-context';

export type AddToCartButtonProps = {
  productId: number;
  naam: string;
  gewicht: string;
  /** This week's remaining stock, if tracked — caps how many can be added. */
  max?: number;
};

/**
 * The "add to order" control on a product card. A small client island inside
 * the otherwise-server `ProductCard` — it's the only part of the card that
 * needs the cart context.
 */
export function AddToCartButton({
  productId,
  naam,
  gewicht,
  max,
}: AddToCartButtonProps) {
  const { add, isOrderingEnabled } = useCart();

  if (!isOrderingEnabled) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      className={styles.button}
      aria-label={`Voeg toe aan bestelling — ${naam}`}
      onClick={() => add({ productId, naam, gewicht, max })}>
      <Plus aria-hidden="true" size={18} strokeWidth={1.75} />
      {/* Compact visible label so it fits the card button; the full
          "Voeg toe aan bestelling" phrasing stays in the aria-label. */}
      <span>Toevoegen</span>
    </Button>
  );
}
