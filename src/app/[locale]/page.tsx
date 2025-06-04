'use client';

import Contact from '@/components/sections/contact/Contact';
import Gallery from '@/components/sections/gallery/Gallery';
import Informations from '@/components/sections/informations/Informations';
import Intro from '@/components/sections/intro/Intro';
import Reservation from '@/components/sections/reservations/Reservations';

export default function Home() {
  return (
    <>
      <Intro />
      <Informations />
      <Gallery />
      <Reservation />
      <Contact />
    </>
  );
}
