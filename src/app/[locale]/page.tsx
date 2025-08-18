'use client';
import dynamic from 'next/dynamic';
import { PostcardsSelectionProvider } from '@/contexts/PostcardsSelectionContext';

// Components
import { Hero } from '@/sections/home/Hero/Hero';
import { Postcards } from '@/sections/home/Postcards/Postcards';
// import { ConstructorSet } from '@/sections/home/ConstructorSet/ConstructorSet';
// import { Order } from '@/sections/home/Order/Order';

// const Postcards = dynamic(
//   () => import('@/sections/home/Postcards/Postcards').then((m) => m.Postcards),
//   { ssr: false }
// );

const ConstructorSet = dynamic(
  () => import('@/sections/home/ConstructorSet/ConstructorSet').then((m) => m.ConstructorSet),
  { ssr: false }
);

const Order = dynamic(() => import('@/sections/home/Order/Order').then((m) => m.Order), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <ConstructorSet />
      <PostcardsSelectionProvider>
        <Postcards />
        <Order />
      </PostcardsSelectionProvider>
    </main>
  );
}
