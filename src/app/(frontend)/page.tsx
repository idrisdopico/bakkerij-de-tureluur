import { About } from '@/components/about';
import { Assortiment } from '@/components/assortiment';
import { Contact } from '@/components/contact';
import { Hero } from '@/components/hero';
import { Principles } from '@/components/principles';

export default function Page() {
  return (
    <main>
      <Hero />
      <Principles />
      <About />
      <Assortiment />
      <Contact />
    </main>
  );
}
