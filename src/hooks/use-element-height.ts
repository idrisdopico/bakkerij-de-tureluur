import { type RefObject, useLayoutEffect, useState } from 'react';

/**
 * Tracks an element's rendered height in px, live — via `ResizeObserver`,
 * not a one-off measurement, so it stays correct through CSS transitions,
 * responsive layout changes, etc. Used for the site header, whose height
 * changes when it shrinks on scroll (see `useScrolled`): anything that
 * needs to know "how tall is the header right now" (scrollspy's
 * `topOffset`, `scroll-padding-top`) should measure it, not hardcode a
 * number that's only correct in one of its states.
 */
export function useElementHeight(ref: RefObject<HTMLElement | null>): number {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setHeight(
          entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height,
        );
      }
    });

    observer.observe(element);
    setHeight(element.getBoundingClientRect().height);

    return () => observer.disconnect();
  }, [ref]);

  return height;
}
