import { RichText } from '@payloadcms/richtext-lexical/react';
import { Bird } from 'lucide-react';

import { getAbout } from '../backend/lib/content';
import styles from './about.module.scss';
import { SectionIntro } from './section-intro';

/**
 * `async` — the subtitle and story paragraphs are editable via `/admin` (see
 * `src/backend/globals/about.ts`). `paragraphs` is rich text, rendered back
 * to JSX by Payload's own `RichText` component rather than a hand-rolled
 * renderer.
 */
export async function About() {
  const about = await getAbout();

  return (
    <section id="over" className={styles.about}>
      <SectionIntro
        icon={<Bird strokeWidth={1.5} aria-hidden="true" />}
        iconBackground="sunken"
        title="Over ons"
        subtitle={about.subtitle}
      />

      <RichText className={styles.paragraph} data={about.paragraphs} />
    </section>
  );
}
