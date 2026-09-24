import Image from 'next/image';

import type { Product as PayloadProduct } from '@/payload-types';

import { AddToCartButton } from './cart/add-to-cart-button';
import styles from './product-card.module.scss';
import { ProductImagePlaceholder } from './product-image-placeholder';

export type ProductCardProps = {
  product: PayloadProduct;
};

/**
 * One card in the assortiment grid. The design repeats this exact shape
 * (image, name, ingredients, weight) 17 times via `sc-for` — split out here
 * so `Assortiment` just maps over the product list from Payload.
 *
 * `product.foto` is optional in the CMS (see `src/backend/collections/
 * products.ts`) — most products still have no real photo yet, so this falls
 * back to `ProductImagePlaceholder` until one is uploaded. The upload field
 * comes back either as a populated `Media` object or just its id string
 * depending on query depth; the `typeof` check picks out the populated case.
 */
export function ProductCard({ product }: ProductCardProps) {
  const photo =
    product.foto && typeof product.foto === 'object' ? product.foto : null;
  // Two distinct off-states: the owner switched it off (`beschikbaar: false`),
  // or this week's stock ran out (`voorraad` reached 0). Only an explicit
  // `false`/`0` counts, so products predating these fields stay orderable.
  const isSwitchedOff = product.beschikbaar === false;
  const isSoldOut =
    typeof product.voorraad === 'number' && product.voorraad <= 0;
  const canOrder = !isSwitchedOff && !isSoldOut;

  return (
    <li className={styles.card}>
      {photo && photo.url ? (
        <div className={styles.image}>
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            sizes="(min-width: 860px) 25vw, 50vw"
            className={styles.photo}
          />
        </div>
      ) : (
        <ProductImagePlaceholder className={styles.image} />
      )}
      <div className={styles.body}>
        <h4 className={styles.name}>{product.naam}</h4>
        <p className={styles.ingredients}>{product.ingr}</p>
        <p className={styles.weight}>{product.gewicht}</p>
        {canOrder ? (
          <AddToCartButton
            productId={product.id}
            naam={product.naam}
            gewicht={product.gewicht}
            max={product.voorraad ?? undefined}
          />
        ) : (
          <p className={styles.unavailable}>
            {isSwitchedOff ? 'Tijdelijk niet beschikbaar' : 'Uitverkocht'}
          </p>
        )}
      </div>
    </li>
  );
}
