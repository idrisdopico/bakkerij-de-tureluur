import type { Metadata } from 'next';
import { Mulish, Source_Serif_4 } from 'next/font/google';
import type { ReactNode } from 'react';

import { getBestellen, getContact, getHero } from '@/backend/lib/content';
import { CartProvider } from '@/components/cart/cart-context';
import { CartOverlay } from '@/components/cart/cart-overlay';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';
import { StructuredData } from '@/components/structured-data';
import '@/styles/global.scss';

// Self-hosted at build via next/font (no render-blocking Google Fonts request),
// exposed as CSS variables the `--font-display` / `--font-body` tokens read.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-source-serif',
});
const mulish = Mulish({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-mulish',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const [hero, contact] = await Promise.all([getHero(), getContact()]);
  const description =
    hero.tagline || contact.copy || 'Ambachtelijke bakkerij in Almere.';
  const heroImage =
    typeof hero.image === 'object' && hero.image?.url
      ? hero.image.url
      : '/logo.png';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Bakkerij de Tureluur',
      template: '%s · Bakkerij de Tureluur',
    },
    description,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      url: '/',
      siteName: 'Bakkerij de Tureluur',
      title: 'Bakkerij de Tureluur',
      description,
      images: [{ url: heroImage, alt: 'Bakkerij de Tureluur' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Bakkerij de Tureluur',
      description,
      images: [heroImage],
    },
  };
}

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const bestellen = await getBestellen();
  const pickupDays = bestellen.pickupDays.map(entry => entry.day);

  return (
    <html lang="nl" className={`${sourceSerif.variable} ${mulish.variable}`}>
      <body>
        <StructuredData />
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
