'use client';

import { type ReactNode, useRef } from 'react';

import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { cn } from '@/lib/utils/cn';

import styles from './dialog.module.scss';

type DialogAlign = 'end' | 'center';

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Accessible name — pass `label` for a literal name or `labelledBy` for an id. */
  label?: string;
  labelledBy?: string;
  /** `end` = drawer sliding from the right, `center` = centered modal. */
  align?: DialogAlign;
  /** Extra class on the panel for its size/layout; the shell is shared. */
  panelClassName?: string;
  children: ReactNode;
};

/**
 * The shared modal-dialog shell behind the cart drawer and the order
 * confirmation modal: the fixed overlay + backdrop, the `role="dialog"` panel,
 * and the scroll-lock / Escape / focus-trap / `inert`-when-closed wiring. Each
 * consumer supplies only its panel styling and content.
 */
export function Dialog({
  isOpen,
  onClose,
  label,
  labelledBy,
  align = 'center',
  panelClassName,
  children,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, onClose);
  useFocusTrap({ ref: panelRef, isActive: isOpen });

  return (
    <div
      className={styles.root}
      data-align={align}
      data-open={isOpen}
      inert={!isOpen}>
      {/* Mouse convenience only — keyboard users close via Esc or the in-panel
          close button, so it's hidden from assistive tech and out of the tab order. */}
      <button
        type="button"
        className={styles.backdrop}
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={cn(styles.panel, panelClassName)}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
        tabIndex={-1}>
        {children}
      </div>
    </div>
  );
}
