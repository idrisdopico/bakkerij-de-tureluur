import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

import { SectionHeading } from './section-heading';
import styles from './section-intro.module.scss';

export type SectionIntroProps = {
  icon: ReactNode;
  /**
   * Background of the icon circle. The design alternates these between
   * sections purely for contrast against the section's own background.
   */
  iconBackground?: 'card' | 'sunken';
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

/**
 * The "icon badge + SectionHeading" intro that opens every content section
 * in the design (principles, "Over ons", assortiment, contact) — same
 * layout and the same local token overrides
 * (`--fs-2xl`/`--text-body`/`--text-muted`) on the heading every time, only
 * the icon, icon background, and copy change.
 */
export function SectionIntro({
  icon,
  iconBackground = 'card',
  title,
  subtitle,
  className,
}: SectionIntroProps) {
  return (
    <div className={cn(styles.intro, className)}>
      <div
        className={cn(
          styles.iconBadge,
          iconBackground === 'sunken' && styles.iconBadgeSunken,
        )}
        aria-hidden="true">
        {icon}
      </div>
      <SectionHeading
        title={title}
        subtitle={subtitle}
        className={styles.heading}
      />
    </div>
  );
}
