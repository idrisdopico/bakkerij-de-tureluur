'use client';

import { Plus } from 'lucide-react';

import { Button } from '../button';
import styles from './add-to-cart-button.module.scss';
import { useCart } from './cart-context';

export type AddToCartButtonProps = {
  productId: number;
  naam: string;
  gewicht: string;
};

/**
 * The "add to basket" control on a product card. A small client island inside
 * the otherwise-server `ProductCard` — it's the only part of the card that
 * needs the cart context.
 */
export function AddToCartButton({
  productId,
  naam,
  gewicht,
}: AddToCartButtonProps) {
  const { add, isOrderingEnabled } = useCart();

  if (!isOrderingEnabled) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      className={styles.button}
      aria-label={`In mandje — ${naam}`}
      onClick={() => add({ productId, naam, gewicht })}>
      <Plus aria-hidden="true" size={18} strokeWidth={1.75} />
      <span>In mandje</span>
    </Button>
  );
}
