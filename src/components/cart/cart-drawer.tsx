'use client';

import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useRef } from 'react';

import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { useFocusTrap } from '@/hooks/use-focus-trap';

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
 * Slide-in cart panel: the basket contents plus the checkout form. Modeled on
 * the mobile-nav overlay in `site-header.tsx` — same scroll-lock, Escape, and
 * `inert`-when-closed behavior, with a focus trap while open.
 */
export function CartDrawer({
  pickupDays,
  pickupPolicy,
  onOrderSuccess,
}: CartDrawerProps) {
  const { items, setQuantity, remove, isOpen, close } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, close);
  useFocusTrap({ ref: panelRef, isActive: isOpen });

  return (
    <div className={styles.root} data-open={isOpen} inert={!isOpen}>
      {/* Mouse convenience only — keyboard users close via Esc or the close
          button, so it's hidden from assistive tech and out of the tab order. */}
      <button
        type="button"
        className={styles.backdrop}
        aria-hidden="true"
        tabIndex={-1}
        onClick={close}
      />
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Winkelmandje"
        tabIndex={-1}>
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
      </div>
    </div>
  );
}
