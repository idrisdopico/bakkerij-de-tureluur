import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

import styles from './icon-button.module.scss';

type Variant = 'ghost' | 'outline';

export type IconButtonProps = {
  variant?: Variant;
  /** Square hit-area size in px. */
  size?: number;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

/**
 * A square, pill-shaped icon-only button — the shared recipe behind the cart
 * trigger, the drawer's close/remove buttons (`ghost`) and its quantity
 * steppers (`outline`). Pass an accessible name via `aria-label` and a
 * decorative icon as children.
 */
export function IconButton({
  variant = 'ghost',
  size = 40,
  className,
  children,
  type,
  style,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={cn(styles.button, styles[variant], className)}
      style={{ width: size, height: size, ...style }}
      {...props}>
      {children}
    </button>
  );
}
