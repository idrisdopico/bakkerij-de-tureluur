import { Birdhouse } from 'lucide-react';

import { getContact } from '@/backend/lib/content';

import styles from './contact.module.scss';
import { SectionIntro } from './section-intro';

/**
 * `async` — the intro copy and email address are editable via `/admin` (see
 * `src/backend/globals/contact.ts`). See that global's own comment for why
 * this is plain, prominent text rather than a `mailto:`-driven form.
 */
export async function Contact() {
  const contact = await getContact();

  return (
    <section id="contact" className={styles.contact}>
      <SectionIntro
        icon={<Birdhouse strokeWidth={1.5} aria-hidden="true" />}
        iconBackground="sunken"
        title="Contact"
        subtitle="Langskomen of bestellen"
      />

      <p className={styles.copy}>{contact.copy}</p>
      <a className={styles.email} href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
    </section>
  );
}
