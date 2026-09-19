import { useEffect } from 'react';

/**
 * Locks page scroll while `isLocked` is true. Used by the full-screen
 * mobile nav overlay so the page behind it can't scroll while it's open.
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
}
