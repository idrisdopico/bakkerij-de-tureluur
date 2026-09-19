'use client';

import { ShoppingBasket } from 'lucide-react';

import styles from './cart-button.module.scss';
import { useCart } from './cart-context';

/**
 * The basket trigger in the site header. Opens the cart drawer and shows a
 * count badge. The badge only appears once the cart has hydrated from
 * localStorage, so the server and first client render agree (no mismatch).
 */
export function CartButton() {
  const { itemCount, isHydrated, isOrderingEnabled, open } = useCart();
  const showBadge = isHydrated && itemCount > 0;

  if (!isOrderingEnabled) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={open}
      aria-label={
        showBadge
          ? `Winkelmandje openen — ${itemCount} ${
              itemCount === 1 ? 'artikel' : 'artikelen'
            }`
          : 'Winkelmandje openen'
      }>
      <ShoppingBasket aria-hidden="true" size={24} strokeWidth={1.5} />
      {showBadge && (
        <span className={styles.badge} aria-hidden="true">
          {itemCount}
        </span>
      )}
    </button>
  );
}
