import { useEffect } from 'react';

/**
 * Calls `onEscape` when Escape is pressed while `isActive` is true. Used to
 * close the full-screen mobile nav overlay from the keyboard.
 */
export function useEscapeKey(isActive: boolean, onEscape: () => void): void {
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
