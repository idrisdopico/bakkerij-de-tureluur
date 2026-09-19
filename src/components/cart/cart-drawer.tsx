'use client';

import { Minus, Plus, Trash2, X } from 'lucide-react';

import { Dialog } from '../dialog';
import { IconButton } from '../icon-button';
import { useCart } from './cart-context';
import styles from './cart-drawer.module.scss';
import { CheckoutForm } from './checkout-form';

export type CartDrawerProps = {
  pickupDays: string[];
  pickupPolicy: string;
  /** Called after a successful order, so the parent can show confirmation. */
  onOrderSuccess: () => void;
};

/**
 * Slide-in cart panel: the basket contents plus the checkout form. The overlay
 * shell (scroll-lock, Escape, focus trap, `inert`-when-closed) lives in the
 * shared `Dialog`; this component supplies the panel content.
 */
export function CartDrawer({
  pickupDays,
  pickupPolicy,
  onOrderSuccess,
}: CartDrawerProps) {
  const { items, setQuantity, remove, isOpen, close } = useCart();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={close}
      label="Winkelmandje"
      align="end"
      panelClassName={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Winkelmandje</h2>
        <IconButton
          variant="ghost"
          size={40}
          onClick={close}
          aria-label="Winkelmandje sluiten">
          <X aria-hidden="true" size={24} strokeWidth={1.5} />
        </IconButton>
      </div>

      <div className={styles.content}>
        <div className={styles.body}>
          {items.length === 0 ? (
            <p className={styles.empty}>Je winkelmandje is nog leeg.</p>
          ) : (
            <ul className={styles.items}>
              {items.map(item => (
                <li key={item.productId} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.naam}</p>
                    {item.gewicht && (
                      <p className={styles.itemWeight}>{item.gewicht}</p>
                    )}
                  </div>
                  <div className={styles.quantity}>
                    <IconButton
                      variant="outline"
                      size={32}
                      onClick={() =>
                        setQuantity(item.productId, item.quantity - 1)
                      }
                      aria-label={`Eén minder ${item.naam}`}>
                      <Minus aria-hidden="true" size={16} strokeWidth={2} />
                    </IconButton>
                    <span className={styles.count} aria-live="polite">
                      {item.quantity}
                    </span>
                    <IconButton
                      variant="outline"
                      size={32}
                      onClick={() =>
                        setQuantity(item.productId, item.quantity + 1)
                      }
                      aria-label={`Eén meer ${item.naam}`}>
                      <Plus aria-hidden="true" size={16} strokeWidth={2} />
                    </IconButton>
                  </div>
                  <IconButton
                    variant="ghost"
                    size={36}
                    onClick={() => remove(item.productId)}
                    aria-label={`${item.naam} verwijderen`}>
                    <Trash2 aria-hidden="true" size={18} strokeWidth={1.5} />
                  </IconButton>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <CheckoutForm
              pickupDays={pickupDays}
              pickupPolicy={pickupPolicy}
              onOrderSuccess={onOrderSuccess}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}
