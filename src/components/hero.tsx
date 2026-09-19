import Image from 'next/image';

import { getHero } from '@/backend/lib/content';
import { cn } from '@/lib/utils/cn';

import { Button } from './button';
import styles from './hero.module.scss';

const CONTACT_EMAIL = 'detureluur@gmail.com';

/**
 * `async` (a Server Component, fetching from Payload on every render) — the
 * headline, tagline, and background photo are editable via `/admin` (see
 * `src/backend/globals/hero.ts`). The two CTAs stay hard-coded: they're
 * structural navigation (a `mailto:` link, a `#assortiment` anchor), not
 * prose someone would edit.
 */
export async function Hero() {
  const hero = await getHero();
  const image = typeof hero.image === 'object' ? hero.image : null;

  return (
    <section id="home" className={styles.hero}>
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="100vw"
          priority
          className={styles.imageLayer}
        />
      )}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.heading}>{hero.headline}</h1>
        <p className={styles.tagline}>{hero.tagline}</p>

        <div className={styles.actions}>
          <Button
            variant="accent"
            size="lg"
            href={`mailto:${CONTACT_EMAIL}`}
            className={styles.action}>
            Bestel per e-mail
          </Button>

          <div className={cn(styles.action, styles.actionOnDark)}>
            <Button
              variant="secondary"
              size="lg"
              href="#assortiment"
              className={styles.actionButtonFull}>
              Bekijk assortiment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
