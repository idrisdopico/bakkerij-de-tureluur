import { useEffect } from 'react';

type UseEscapeKeyParams = {
  isActive: boolean;
  onEscape: () => void;
};

/**
 * Calls `onEscape` when Escape is pressed while `isActive` is true. Used to
 * close overlays (the mobile nav, the cart drawer, the confirmation modal)
 * from the keyboard.
 */
export function useEscapeKey({ isActive, onEscape }: UseEscapeKeyParams): void {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onEscape]);
}
