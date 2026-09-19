import { revalidatePath } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';

/**
 * Every editable global/collection in this app renders on the single
 * homepage (`/`) — there's no per-section route to work out. Rather than
 * writing `revalidatePath('/')` inline in every global/collection config
 * (and risking one getting missed, or drifting if the path ever changes),
 * each config depends on one of these three factories. That's the one place
 * "which path does this content affect" is decided; nothing else needs to
 * know `revalidatePath` exists at all.
 */

/**
 * `revalidatePath` only works inside a Next.js request/render context. Payload
 * writes can also happen outside one — e.g. the cutover seed run via
 * `payload run` — where it throws "static generation store missing". In that
 * case there's no running server holding a cache to revalidate, so this
 * specific error is a safe no-op; anything else is re-thrown.
 */
const safeRevalidate = (path: string) => {
  try {
    revalidatePath(path);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes('static generation store')) {
      throw error;
    }
  }
};

export const revalidateGlobal =
  (path = '/'): GlobalAfterChangeHook =>
  ({ doc }) => {
    safeRevalidate(path);
    return doc;
  };

export const revalidateCollectionChange =
  (path = '/'): CollectionAfterChangeHook =>
  ({ doc }) => {
    safeRevalidate(path);
    return doc;
  };

export const revalidateCollectionDelete =
  (path = '/'): CollectionAfterDeleteHook =>
  ({ doc }) => {
    safeRevalidate(path);
    return doc;
  };
