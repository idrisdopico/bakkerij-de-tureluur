'use client';

import { useOrderingOpen } from '@/hooks/use-ordering-open';

import styles from './ordering-closed-notice.module.scss';

export type OrderingClosedNoticeProps = {
  /**
   * The CMS master switch. When ordering is switched off entirely there's no
   * notice (the whole feature is simply gone); this only explains the *time
   * window* being closed while ordering is otherwise on.
   */
  ordersEnabled: boolean;
  /** The notice copy, editable in `/admin` (the `bestellen` global). */
  notice: string;
};

/**
 * Explains why the order buttons are missing when the shop is inside its
 * closed window (weekends + Monday morning), so the assortiment doesn't just
 * silently lack a way to order. Evaluates the window on the client — see
 * `useOrderingOpen` — so it stays correct on a statically-rendered page.
 */
export function OrderingClosedNotice({
  ordersEnabled,
  notice,
}: OrderingClosedNoticeProps) {
  const isOpen = useOrderingOpen();

  if (!ordersEnabled || isOpen) {
    return null;
  }

  return <p className={styles.notice}>{notice}</p>;
}
