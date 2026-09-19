import { type RefObject, useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

type UseFocusTrapParams = {
  ref: RefObject<HTMLElement | null>;
  /** When true, focus is moved into the container and kept there. */
  isActive: boolean;
};

/**
 * Traps keyboard focus inside `ref` while `isActive` — for modal dialogs and
 * the cart drawer. On activation it moves focus into the container; Tab and
 * Shift+Tab cycle within it; on deactivation it restores focus to whatever was
 * focused before (typically the trigger). Synchronising with the DOM focus
 * system is exactly the kind of external-system work `useEffect` is for.
 */
export function useFocusTrap({ ref, isActive }: UseFocusTrapParams): void {
  useEffect(() => {
    if (!isActive) {
      return;
    }
    const container = ref.current;
    if (!container) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables =
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    // `preventScroll` so moving focus in/out doesn't jump the page — the body
    // is scroll-locked while open, and on close we don't want the restored
    // trigger scrolled into view.
    (focusables[0] ?? container).focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }
      const current = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (current.length === 0) {
        event.preventDefault();
        return;
      }
      const first = current[0];
      const last = current[current.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [ref, isActive]);
}
