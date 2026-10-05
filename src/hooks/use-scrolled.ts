import { useEffect, useState } from 'react';

/**
 * Reports whether the page has been scrolled "away from the top", used to
 * shrink the sticky site header once the hero is no longer at the very top.
 *
 * Uses **hysteresis** — two thresholds, not one — on purpose. The header
 * changes height by ~36px between its full and shrunk states, and because it's
 * `position: sticky` in normal flow, that height change can itself nudge the
 * scroll position by a similar amount. With a single threshold, a scroll that
 * settles near it (e.g. coasting up to almost the top) makes the state flip,
 * which resizes the header, which nudges the scroll back across the threshold,
 * which flips the state again — the animation never settles and the header
 * visibly glitches. Separating the enter/exit points by a dead zone wider than
 * that height delta stops the flip-flop:
 *
 * - becomes `true` only once scrolled past `enterThreshold`
 * - returns to `false` only once back above the top within `exitThreshold`
 * - holds its current value anywhere in between
 */
export function useScrolled(enterThreshold = 64, exitThreshold = 8): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(prev => {
        if (!prev && y > enterThreshold) return true;
        if (prev && y < exitThreshold) return false;
        return prev;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enterThreshold, exitThreshold]);

  return isScrolled;
}
