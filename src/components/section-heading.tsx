import type { ReactNode } from 'react';

import { cn } from '../lib/utils/cn';
import styles from './section-heading.module.scss';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /**
   * Heading level for `title`. Defaults to `h2` because every current
   * caller (Principles, About, and the upcoming Assortiment/Contact
   * sections) is a top-level section of a page whose one `h1` lives in
   * `Hero`. Override this if `SectionHeading` is ever nested one level
   * deeper (e.g. inside a card within a section) so the document outline
   * stays correct.
   */
  level?: HeadingLevel;
  align?: 'left' | 'center';
  className?: string;
};

/**
 * Ported from the design system's `components/core/SectionHeading.jsx`,
 * with one deliberate deviation from the design: title/eyebrow/subtitle
 * render as a real heading (`h2` by default) plus `<p>`s inside an
 * `<hgroup>`, not `<div>`s — search engines and assistive tech both rely on
 * real heading elements to build a page's outline, and `<hgroup>` is the
 * HTML element for exactly this "heading with an accompanying
 * kicker/subtitle" shape (only the heading it contains counts toward the
 * outline).
 *
 * Title/subtitle read the `--fs-2xl`/`--text-body`/`--text-muted` tokens,
 * which callers can locally override (see `SectionIntro`) to re-theme a
 * single heading instance without a variant prop.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  level = 'h2',
  align = 'left',
  className,
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <hgroup
      className={cn(
        styles.heading,
        align === 'center' && styles.center,
        className,
      )}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Heading className={styles.title}>{title}</Heading>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </hgroup>
  );
}
