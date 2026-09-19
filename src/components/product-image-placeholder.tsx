import { cn } from '../lib/utils/cn';
import styles from './product-image-placeholder.module.scss';

export type ProductImagePlaceholderProps = {
  className?: string;
};

/**
 * Stand-in for a product photo. The design's product grid hotlinked Unsplash
 * stock photos per item, which don't represent this bakery's actual
 * products — rather than ship placeholder photos that look like real
 * product photography, this renders a plain icon tile so it's obvious at a
 * glance that real photography is still needed. Swap this for a real
 * `next/image` (see `hero.tsx`'s own-photo pattern) once product photos
 * exist; no attribution component is needed for owned photos.
 */
export function ProductImagePlaceholder({
  className,
}: ProductImagePlaceholderProps) {
  return (
    <div className={cn(styles.placeholder, className)}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true">
        <path d="M4 12c0-4.5 3.5-8 8-8s8 3.5 8 8-3 6-8 6-8-1.5-8-6Z" />
        <path d="M4 12c-1.5 1-2 2.5-1 4 1.5 2 4 1.5 5-.5" />
        <path d="M20 12c1.5 1 2 2.5 1 4-1.5 2-4 1.5-5-.5" />
      </svg>
    </div>
  );
}
