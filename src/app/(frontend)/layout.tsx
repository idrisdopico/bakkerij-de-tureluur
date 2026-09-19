import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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

export default function RootLayout({ children }: Props) {
  return (
    <html lang="nl">
      <body>
        <SiteHeader title="Bakkerij de Tureluur" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
