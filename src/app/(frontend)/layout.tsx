import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { getBestellen } from '../../backend/lib/content';
import { CartProvider } from '../../components/cart/cart-context';
import { CartOverlay } from '../../components/cart/cart-overlay';
import { Footer } from '../../components/footer';
import { SiteHeader } from '../../components/site-header';
import '../../styles/global.scss';

export const metadata: Metadata = {
  title: 'Bakkerij de Tureluur',
  description: 'Website for Bakkerij de Tureluur',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const bestellen = await getBestellen();
  const pickupDays = bestellen.pickupDays.map(entry => entry.day);

  return (
    <html lang="nl">
      <body>
        <CartProvider isOrderingEnabled={bestellen.ordersEnabled}>
          <SiteHeader title="Bakkerij de Tureluur" />
          {children}
          <Footer />
          {bestellen.ordersEnabled && (
            <CartOverlay
              pickupDays={pickupDays}
              pickupPolicy={bestellen.pickupPolicy}
            />
          )}
        </CartProvider>
      </body>
    </html>
  );
}
