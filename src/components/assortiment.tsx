import { RichText } from '@payloadcms/richtext-lexical/react';
import { Croissant } from 'lucide-react';

import {
  getAssortimentIntro,
  getBestellen,
  getProducts,
} from '@/backend/lib/content';

import styles from './assortiment.module.scss';
import { OrderingClosedNotice } from './cart/ordering-closed-notice';
import { ProductCard } from './product-card';
import { SectionIntro } from './section-intro';

/**
 * `async` — the two intro blocks, the "Overzicht assortiment" heading, and
 * the product list itself are all editable via `/admin`: the intro copy
 * through the `Assortiment` global (`src/backend/globals/assortiment.ts`),
 * the products through the `Products` collection
 * (`src/backend/collections/products.ts`), since that's a repeated list
 * rather than a fixed block of text.
 */
export async function Assortiment() {
  const [intro, products, bestellen] = await Promise.all([
    getAssortimentIntro(),
    getProducts(),
    getBestellen(),
  ]);

  return (
    <section id="assortiment" className={styles.assortiment}>
      <div className={styles.container}>
        <SectionIntro
          icon={<Croissant strokeWidth={1.5} aria-hidden="true" />}
          iconBackground="card"
          title="De producten"
          subtitle="Wat we bakken"
        />

        <div className={styles.intro}>
          <h3 className={styles.subheading}>{intro.introOneHeading}</h3>
          <RichText className={styles.copy} data={intro.introOne} />
        </div>

        <div className={styles.intro}>
          <h3 className={styles.subheading}>{intro.introTwoHeading}</h3>
          <RichText className={styles.copy} data={intro.introTwo} />
        </div>

        <h3 className={styles.overviewHeading}>{intro.overviewHeading}</h3>

        <OrderingClosedNotice ordersEnabled={bestellen.ordersEnabled} />

        <ul className={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
