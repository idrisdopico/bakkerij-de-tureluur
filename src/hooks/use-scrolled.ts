import { useEffect, useState } from 'react';

/**
 * Reports whether the page has been scrolled past `threshold` px. Used to
 * shrink the sticky site header once the hero is no longer at the very top,
 * rather than only ever showing it full-size.
 */
export function useScrolled(threshold = 8): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}
