import { getPayloadClient } from './payload-client';

type StockUpdate = {
  id: number;
  /** The product's new remaining stock (already clamped at 0 by the caller). */
  voorraad: number;
};

/**
 * Writes each product's new remaining stock (`voorraad`) back to Payload.
 * Only products that track stock get an entry here; the caller computes the
 * clamped value from the quantities just ordered.
 *
 * Called *after* the order email is sent, so it's best-effort: the order has
 * already reached the bakery, so a failed stock write must not fail the
 * customer — the owner can correct a product's stock by hand. Kept in the lib
 * layer because it's the one place besides `content.ts` that touches Payload
 * directly (the data-layer seam the frontend/action code depends on).
 */
export async function decrementProductStock(
  updates: StockUpdate[],
): Promise<void> {
  if (updates.length === 0) {
    return;
  }
  const payload = await getPayloadClient();
  await Promise.all(
    updates.map(({ id, voorraad }) =>
      payload.update({ collection: 'products', id, data: { voorraad } }),
    ),
  );
}
