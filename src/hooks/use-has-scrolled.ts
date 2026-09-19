import { useEffect, useState } from 'react';

/**
 * Reports whether the user has scrolled at least once since mount — a
 * one-way latch (stays `true` even if they scroll back to the top), not a
 * live "is the page currently scrolled" check like `useScrolled`. Used to
 * gate the nav's active-link state: the page loading at the top shouldn't
 * make "Home" read as active on its own, only a real scroll (or a nav
 * click) should.
 */
export function useHasScrolled(): boolean {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(true);
    window.addEventListener('scroll', handleScroll, {
      passive: true,
      once: true,
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return hasScrolled;
}
