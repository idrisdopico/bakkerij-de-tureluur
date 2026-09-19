/**
 * The order payload shared between the checkout form (`src/components/cart/
 * checkout-form.tsx`) and the `submitOrder` server action. Kept in its own
 * module — not exported from the `'use server'` file — because a server-action
 * module may only export async functions; the types are erased at build time,
 * so both sides can import them freely.
 */

export type OrderItemInput = {
  productId: number;
  quantity: number;
};

export type SubmitOrderInput = {
  name: string;
  email: string;
  phone: string;
  pickupDay: string;
  notes: string;
  items: OrderItemInput[];
  turnstileToken: string;
  /** Hidden anti-bot field — must be empty for a genuine submission. */
  honeypot: string;
};

export type SubmitOrderResult = { ok: true } | { ok: false; error: string };
