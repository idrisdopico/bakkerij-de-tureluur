import type {
  About,
  Assortiment,
  Bestellen,
  Contact,
  Footer,
  Hero,
  Principles,
  Product,
} from '@/payload-types';

import { getPayloadClient } from './payload-client';

/**
 * The only thing `src/components/*.tsx` know about how content is stored —
 * each one calls exactly one of these functions instead of reaching for
 * `getPayloadClient()`/`payload.findGlobal()` itself. That's a Dependency
 * Inversion seam on purpose: if the storage layer ever changed (a different
 * CMS, a cache in front of Payload), only this file would need to change,
 * not every section component.
 */

export async function getHero(): Promise<Hero> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'hero' });
}

export async function getPrinciples(): Promise<Principles> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'principles' });
}

export async function getAbout(): Promise<About> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'about' });
}

export async function getAssortimentIntro(): Promise<Assortiment> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'assortiment' });
}

export async function getProducts(): Promise<Product[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'products',
    sort: 'order',
    limit: 0,
  });
  return docs;
}

/**
 * Fetches only the products with the given ids — used by the order action to
 * re-derive canonical product data (name, weight) from a submitted cart,
 * rather than trusting anything the client sent.
 */
export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) {
    return [];
  }
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'products',
    where: { id: { in: ids } },
    limit: ids.length,
    depth: 0,
  });
  return docs;
}

export async function getContact(): Promise<Contact> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'contact' });
}

export async function getFooter(): Promise<Footer> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'footer' });
}

export async function getBestellen(): Promise<Bestellen> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'bestellen' });
}
