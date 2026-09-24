import { useEffect, useState } from 'react';

import { isOrderingOpen } from '@/lib/dates/ordering-window';

// Re-check often enough that the UI flips within a minute of the window
// opening/closing, without a visitor needing to reload.
const RECHECK_MS = 60_000;

/**
 * Live "is the ordering window open" flag, evaluated on the client — the
 * homepage is statically rendered, so it can't bake in a time-dependent
 * answer. Starts optimistically open so the server render and the first client
 * render agree (no hydration mismatch), then corrects right after mount and
 * keeps re-checking each minute and whenever the tab regains focus.
 */
export function useOrderingOpen(): boolean {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const update = () => setIsOpen(isOrderingOpen());
    update();
    const interval = setInterval(update, RECHECK_MS);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return isOpen;
}
