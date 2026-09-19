import { getPrinciples } from '@/backend/lib/content';

import styles from './principles.module.scss';
import { SectionIntro } from './section-intro';

/**
 * `async` — the list of principles and the closing tagline are editable via
 * `/admin` (see `src/backend/globals/principles.ts`). The `01`/`02`/...
 * numbering is still computed here from each item's position, not stored,
 * so reordering items in the admin panel is all it takes to renumber them.
 */
export async function Principles() {
  const principles = await getPrinciples();

  return (
    <section className={styles.principles}>
      <div className={styles.container}>
        <SectionIntro
          icon={<PrinciplesIcon />}
          iconBackground="card"
          title="Onze uitgangspunten"
          subtitle="Dit zijn onze uitgangspunten:"
        />

        {/* An `<ol>`, not the design's `<ul>`: the numbering is meaningful
            content (see `.num`), not decoration, so an ordered list is the
            more correct element here. `list-style: none` keeps the visual
            unchanged — the design's own `{{ p.num }}` markers still render. */}
        <ol className={styles.list}>
          {principles.items.map((principle, index) => (
            <li key={principle.id ?? index} className={styles.item}>
              <span className={styles.num}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{principle.text}</span>
            </li>
          ))}
        </ol>

        <p className={styles.tagline}>{principles.tagline}</p>
      </div>
    </section>
  );
}

function PrinciplesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={24}
      height={24}>
      <line x1="12" y1="22" x2="12" y2="4" />
      <path d="M12 6l-4 -3" />
      <path d="M12 6l4 -3" />
      <path d="M12 10l-4 -3" />
      <path d="M12 10l4 -3" />
      <path d="M12 14l-4 -3" />
      <path d="M12 14l4 -3" />
      <path d="M12 18l-4 -3" />
      <path d="M12 18l4 -3" />
    </svg>
  );
}
