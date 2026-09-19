import config from '@payload-config';
import { getPayload } from 'payload';
import { cache } from 'react';

/**
 * `getPayload({ config })` does real work (spins up the Local API against
 * the database) — wrapping it in React's `cache()` means every Server
 * Component in a single request shares one instance instead of each
 * `getHero()`/`getProducts()`/etc. call in `content.ts` re-initializing it.
 * This is the one place any of that setup happens; everything else in this
 * app only ever imports from `content.ts`, never this file directly.
 */
export const getPayloadClient = cache(async () => getPayload({ config }));
