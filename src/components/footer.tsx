import { Fragment } from 'react';

import { getContact, getFooter } from '../backend/lib/content';
import styles from './footer.module.scss';

/**
 * `async` — tagline, opening hours, address, and Instagram handle are
 * editable via `/admin` (see `src/backend/globals/footer.ts`). The contact
 * email isn't stored here: it's read from the `Contact` global so there's
 * one place to update it, not two that can drift out of sync.
 *
 * Rendered in `layout.tsx` as a sibling of `<main>`, not inside it — same
 * reasoning as `SiteHeader`: a `<footer>` only gets the implicit
 * "contentinfo" landmark role when it isn't a descendant of
 * `main`/`article`/`aside`/`nav`/`section`.
 *
 * The four info groups (opening hours, contact, address, socials) are a
 * `<dl>` of label/value pairs rather than headings — they're quick-reference
 * terms, not new sections of page content, so `<dt>`/`<dd>` avoids adding
 * four more entries to the page's heading outline. The physical address
 * specifically uses `<address>`, the element made for exactly this.
 */
export async function Footer() {
  const [footer, contact] = await Promise.all([getFooter(), getContact()]);
  const instagramUrl = `https://instagram.com/${footer.instagramHandle}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <p className={styles.brandName}>Bakkerij de Tureluur</p>
          <p className={styles.tagline}>{footer.tagline}</p>
        </div>

        <dl className={styles.grid}>
          <div className={styles.group}>
            <dt className={styles.label}>Openingstijden</dt>
            <dd className={styles.value}>
              {footer.openingHours.map((entry, index) => (
                <Fragment key={entry.id ?? index}>
                  {index > 0 && <br />}
                  {entry.day} {entry.hours}
                </Fragment>
              ))}
            </dd>
          </div>

          <div className={styles.group}>
            <dt className={styles.label}>Adres</dt>
            <dd className={styles.value}>
              <address className={styles.address}>
                {footer.addressLine1}
                <br />
                {footer.addressLine2}
              </address>
            </dd>
          </div>

          <div className={styles.group}>
            <dt className={styles.label}>Socials</dt>
            <dd className={styles.value}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                instagram.com/{footer.instagramHandle}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
