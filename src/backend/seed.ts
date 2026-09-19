import config from '@payload-config';
import { readFileSync } from 'fs';
import path from 'path';
import { getPayload } from 'payload';
import { fileURLToPath } from 'url';

import type { About, Assortiment } from '../payload-types';
import { richTextFromParagraphs } from './lib/rich-text';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * One-time cutover seed: populates every global and the product list with
 * the copy the site already had hard-coded before it moved into Payload, so
 * the public pages aren't blank the moment this backend goes live. Run with:
 *
 *   pnpm payload run src/backend/seed.ts
 *
 * Safe to run more than once — globals are always upserted (Payload creates
 * a global's document on its first write regardless), and the product seed
 * is skipped entirely if any products already exist, so it won't duplicate
 * the list if you run it again later.
 */
async function seed() {
  const payload = await getPayload({ config });

  payload.logger.info('Seeding hero...');
  const heroImagePath = path.resolve(dirname, '../../public/images/hero.jpg');
  const existingHeroImage = await payload.find({
    collection: 'media',
    where: { filename: { equals: 'hero.jpg' } },
    limit: 1,
  });
  const heroImageFile = readFileSync(heroImagePath);
  const heroImage =
    existingHeroImage.docs[0] ??
    (await payload.create({
      collection: 'media',
      data: {
        alt: 'Versgebakken brood in een mand bij Bakkerij de Tureluur',
      },
      file: {
        data: heroImageFile,
        mimetype: 'image/jpeg',
        name: 'hero.jpg',
        size: heroImageFile.length,
      },
    }));

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      headline:
        'Bakkerij de Tureluur — est 2019 · de eerste bakkerij in het Oosterwold!',
      tagline: 'Voor mooi en eerlijk brood met karakter.',
      image: heroImage.id,
    },
  });

  payload.logger.info('Seeding principles...');
  await payload.updateGlobal({
    slug: 'principles',
    data: {
      items: [
        {
          text: 'Pure grondstoffen gebruiken, van biologische of biologisch dynamische oorsprong en zo regionaal mogelijk geproduceerd',
        },
        { text: 'De meeste van onze degen bereiden met desem' },
        { text: 'Geen onnodige toevoegingen of meelverbeteraars gebruiken' },
        {
          text: 'Het deeg ruim tijd geven te fermenteren, veelal overnacht zodat het makkelijk verteerbaar is en alle tijd heeft optimaal smaak en aroma te ontwikkelen',
        },
        { text: 'Ons deeg handmatig verwerken' },
        {
          text: 'Al onze producten volledig zelf maken, dus geen halffabricaten inkopen',
        },
        { text: 'Al onze producten vers aanbieden tenzij anders vermeld' },
        {
          text: 'Zo mogelijk producten van eigen erf/Oosterwold benutten, denk aan fruit, kruiden, groenten en eieren',
        },
      ],
      tagline: 'Zo bakken we brood zoals brood hoort te zijn.',
    },
  });

  payload.logger.info('Seeding about...');
  await payload.updateGlobal({
    slug: 'about',
    data: {
      subtitle: 'Sandra Ansmink & Ezra Dopico Peña',
      paragraphs: richTextFromParagraphs<About['paragraphs']>([
        'De bakkerij opende op 11 mei 2019 voor het eerst haar deur. Dat was weliswaar de deur van ons tijdelijke pand, maar toch. Het gaf ons de kans een jaar met het Oosterwold te groeien, vraag en aanbod af te tasten en kennis te maken met een fantastische klantenkring. Wat voelen wij ons bevoorrecht!',
        'Na bijna een jaar hebben we het definitieve pand betrokken, nee niet alles is af, maar het is werkbaar. Een zee van ruimte. We kunnen de productie opschalen door meer ruimte, en qua bedrijfsmiddelen breiden we stap voor stap uit.',
      ]),
    },
  });

  payload.logger.info('Seeding assortiment intro...');
  await payload.updateGlobal({
    slug: 'assortiment',
    data: {
      introOneHeading: 'Bio en puur desem',
      introOne: richTextFromParagraphs<Assortiment['introOne']>([
        'Robuuste desembroden van diverse graansoorten en baguettes vormen de basis van het assortiment. Zo is er de lemaire, een mooie batard van gebuild tarwemeel (=lemaire) op basis van een volkoren-roggedesem. De lemaire is er tevens in een gevulde variant. Het tarwe volkorenbrood, een batard waar we zonnebloempitten of pompoenpitten aan toevoegen, heeft ook een roggedesem als basis en overigens een deel speltmeel. Hiermee is het eigenlijk een meergranenbrood. Het zijn karaktervolle broden op de stenen vloer gebakken. Ook speltbrood in diverse varianten, meer of minder volkoren en al dan niet met sesam- of maanzaad behoren tot het vaste assortiment. Uiteraard volledig op desembasis.',
        'In aanvulling op het vaste assortiment desembrood is er een variatie aan andere broden afhankelijk van seizoen en beschikbaarheid van producten. In alle broden zit maximaal 2% Keltisch zeezout.',
      ]),
      introTwoHeading: 'Bio viennoiserie',
      introTwo: richTextFromParagraphs<Assortiment['introTwo']>([
        "Er zijn regelmatig brioches, al dan niet met een vulling van gekonfijte vruchten, chocolade en 'raw cacao', vloerkadetjes, appel-rozijnenbolletjes, kwarkbolletjes, Italiaanse bollen, groentebroodjes etc. Voor dit type brood gebruiken we soms behalve desem ook gist of een voordeeg.",
        'Ook hebben we croissants, deze zijn beschikbaar in allerlei variaties, onder andere met kaas of als Danish met vulling van frangipane en vruchten.',
      ]),
      overviewHeading: 'Overzicht assortiment',
    },
  });

  payload.logger.info('Seeding products...');
  const existingProducts = await payload.count({ collection: 'products' });
  if (existingProducts.totalDocs > 0) {
    payload.logger.info(
      `Skipping products — ${existingProducts.totalDocs} already exist.`,
    );
  } else {
    const products: { naam: string; ingr: string; gewicht: string }[] = [
      {
        naam: 'Lemaire/Grijs brood',
        ingr: 'Gebuild tarwemeel/lemaire en roggedesem',
        gewicht: '½ kg, 1 kg',
      },
      {
        naam: 'Gevulde lemaire',
        ingr: 'Gebuild tarwemeel/lemaire, tarwedesem, abrikozen, walnoten en hazelnoten',
        gewicht: '580 g',
      },
      {
        naam: 'Tarwe volkoren (meergranen)',
        ingr: 'Tarwemeel, speltmeel, pitjes en roggedesem',
        gewicht: '600 g, 900 g',
      },
      {
        naam: 'Volkoren rozijnen',
        ingr: 'Tarwemeel, tarwedesem en rozijnen',
        gewicht: '500 g',
      },
      {
        naam: 'Polderlandbrood grijs',
        ingr: 'Lokaal steengemalen tarwebloem en tarwedesem',
        gewicht: '800 g',
      },
      {
        naam: 'Spelt wit',
        ingr: 'Speltbloem, (rogge), tarwedesem met/zonder maanzaad/sesamzaad',
        gewicht: '600 g',
      },
      {
        naam: 'Spelt bruin',
        ingr: 'Speltmeel- en bloem, tarwedesem met/zonder maanzaad/sesamzaad',
        gewicht: '600 g',
      },
      {
        naam: 'Baguette',
        ingr: 'Tarwebloem, tarwedesem, (soms rogge/durum/kamut) eventueel zaden en pitten',
        gewicht: '350 g',
      },
      {
        naam: 'Baguette XL',
        ingr: 'Tarwebloem, tarwedesem, (soms rogge/durum/kamut) eventueel zaden en pitten',
        gewicht: '500 g',
      },
      {
        naam: 'Ciabatta/Focaccia/Italiaanse bol',
        ingr: 'Tarwebloem, (durum), (speltbloem), tarwedesem, olijfolie, soms vulling gedroogde tomaat, olijven en kruiden',
        gewicht: 'Divers',
      },
      {
        naam: 'Pain de Seigle',
        ingr: 'Roggemeel, roggedesem, wisselende vulling (bijv. walnoten, oude kaas of notenmix)',
        gewicht: '600 g',
      },
      {
        naam: 'Tureluurtje',
        ingr: 'Gebuild tarwemeel en bloem, tarwedesem, roggemeel, port, krenten, walnoten en rocquefort',
        gewicht: '250 g',
      },
      {
        naam: 'Vloerkadetje',
        ingr: 'Tarwebloem, tarwedesem, gist, melk, suiker, ei, boter en rijstmeel',
        gewicht: '80 g',
      },
      {
        naam: 'Appel-Rozijnenbolletje',
        ingr: 'Tarwebloem en gebuild meel, gist, melk, suiker, ei, boter, appel, rozijnen en/of krenten',
        gewicht: '80–90 g',
      },
      {
        naam: 'Haverbol',
        ingr: 'Tarwe- meel en bloem, tarwedesem, roggemeel en havervlokken',
        gewicht: '500 g',
      },
      {
        naam: 'Brioche',
        ingr: 'Tarwebloem, suiker, honing, tarwedesem, gist, melk, boter en ei',
        gewicht: '100 g',
      },
      {
        naam: 'Brioche gevuld',
        ingr: 'Tarwebloem, suiker, honing, tarwedesem, gist, melk, boter, ei, chocolade en citrus',
        gewicht: '100 g',
      },
      {
        naam: 'Croissant',
        ingr: 'Tarwebloem, ei, boter, melk, suiker, tarwedesem en gist',
        gewicht: '90 g',
      },
    ];

    for (const [index, product] of products.entries()) {
      await payload.create({
        collection: 'products',
        data: { ...product, order: index + 1 },
      });
    }
  }

  payload.logger.info('Seeding contact...');
  await payload.updateGlobal({
    slug: 'contact',
    data: {
      copy: 'Wil je iets bestellen of heb je een vraag? Stuur een e-mail naar:',
      email: 'detureluur@gmail.com',
    },
  });

  payload.logger.info('Seeding footer...');
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: 'Duurzaam en puur',
      openingHours: [
        { day: 'Zaterdag', hours: '9.00 - 14.00' },
        { day: 'Zondag', hours: '9.00 – 14.00' },
      ],
      addressLine1: 'Tureluurdwarsstraat 12',
      addressLine2: '1349 EK Almere',
      instagramHandle: 'bakkerij_detureluur',
    },
  });

  payload.logger.info('Seeding bestellen...');
  await payload.updateGlobal({
    slug: 'bestellen',
    data: {
      ordersEnabled: true,
      pickupDays: [{ day: 'Zaterdag' }, { day: 'Zondag' }],
      pickupPolicy:
        'Haal je bestelling vóór 13.00 uur op. Daarna kunnen we bestelde producten aan andere klanten verkopen om verspilling te voorkomen. Je ontvangt geen automatische bevestiging — we lezen elke bestelling zelf en nemen contact op als er iets onduidelijk is.',
    },
  });

  payload.logger.info('Seed complete.');
}

// Must be awaited at the top level, not left as a floating `seed().catch()`:
// `payload run` only `await import()`s this module and then immediately calls
// `process.exit(0)`, so a floating promise gets killed before it finishes
// writing. Top-level await keeps the import (and thus the process) alive until
// seeding is done. Requires this file to be ESM (`"type": "module"`).
try {
  await seed();
} catch (error) {
  console.error(error);
  process.exit(1);
}
