'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useOrderingOpen } from '@/hooks/use-ordering-open';

const STORAGE_KEY = 'bakkerij-de-tureluur-cart';
// Stored carts older than this are discarded on load, so a stale basket from
// a week ago doesn't resurface as if it were current.
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_QUANTITY = 99;

export type CartItem = {
  productId: number;
  naam: string;
  gewicht: string;
  quantity: number;
  /** This week's remaining stock at page load, capping the quantity that can
   * be added; undefined = the product doesn't track stock. */
  max?: number;
};

type AddToCartInput = {
  productId: number;
  naam: string;
  gewicht: string;
  max?: number;
};

type StoredCart = {
  items: CartItem[];
  savedAt: number;
};

type CartContextValue = {
  items: CartItem[];
  /** Total quantity across all items — for the header badge. */
  itemCount: number;
  isOpen: boolean;
  /** False until the client has read localStorage, to avoid SSR mismatch. */
  isHydrated: boolean;
  /** Whether ordering is available right now — switched on in the CMS *and*
   * inside the open window (closed weekends + Monday morning). Gates the entry
   * points (cart button, add-to-order buttons). */
  isOrderingEnabled: boolean;
  add: (product: AddToCartInput) => void;
  setQuantity: (productId: number, quantity: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
  isOrderingEnabled: boolean;
};

export function CartProvider({
  children,
  isOrderingEnabled,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  // The CMS master switch AND the time window must both be open. The window is
  // evaluated live on the client (see the hook) because the page is statically
  // rendered; the order action re-checks it server-side as the authority.
  const isWindowOpen = useOrderingOpen();
  const orderingAvailable = isOrderingEnabled && isWindowOpen;
  // The drawer auto-opens only on the first add of the session, so adding
  // more products doesn't keep popping it open; after that the visitor opens
  // it themselves via the cart button. A ref, not state — it only gates the
  // side effect below and never needs to trigger a re-render.
  const hasAutoOpened = useRef(false);

  // Load the persisted cart once, on the client, discarding anything stale or
  // unreadable. Runs after first paint, so the server and initial client
  // render agree on an empty cart (no hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredCart;
        const isFresh =
          typeof parsed?.savedAt === 'number' &&
          Date.now() - parsed.savedAt <= MAX_AGE_MS;
        if (isFresh && Array.isArray(parsed.items)) {
          setItems(parsed.items);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      // Corrupt or unavailable storage (private mode, blocked) — start empty.
    }
    setIsHydrated(true);
  }, []);

  // Persist on every change, but only after hydration so the initial empty
  // state doesn't clobber a stored cart before it's been read.
  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    try {
      if (items.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        const stored: StoredCart = { items, savedAt: Date.now() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      }
    } catch {
      // Storage unavailable — the cart still works for this session.
    }
  }, [items, isHydrated]);

  const add = useCallback((product: AddToCartInput) => {
    // The stock cap never exceeds the global safety cap. Re-store `max` on an
    // existing line too, so a changed stock level takes effect on re-add.
    const cap = Math.min(product.max ?? MAX_QUANTITY, MAX_QUANTITY);
    setItems(previous => {
      const existing = previous.find(
        item => item.productId === product.productId,
      );
      if (existing) {
        return previous.map(item =>
          item.productId === product.productId
            ? {
                ...item,
                max: product.max,
                quantity: Math.min(item.quantity + 1, cap),
              }
            : item,
        );
      }
      return [...previous, { ...product, quantity: 1 }];
    });
    if (!hasAutoOpened.current) {
      hasAutoOpened.current = true;
      setIsOpen(true);
    }
  }, []);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    setItems(previous => {
      if (quantity <= 0) {
        return previous.filter(item => item.productId !== productId);
      }
      return previous.map(item =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.min(
                quantity,
                item.max ?? MAX_QUANTITY,
                MAX_QUANTITY,
              ),
            }
          : item,
      );
    });
  }, []);

  const remove = useCallback((productId: number) => {
    setItems(previous => previous.filter(item => item.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      isOpen,
      isHydrated,
      isOrderingEnabled: orderingAvailable,
      add,
      setQuantity,
      remove,
      clear,
      open,
      close,
    }),
    [
      items,
      itemCount,
      isOpen,
      isHydrated,
      orderingAvailable,
      add,
      setQuantity,
      remove,
      clear,
      open,
      close,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
