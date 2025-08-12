'use client';
import dynamic from 'next/dynamic';
import { PostcardsSelectionProvider } from '@/contexts/PostcardsSelectionContext';

// Components
import { Hero } from '@/sections/home/Hero/Hero';
import Postcards from '@/sections/home/Postcards/Postcards';
// import Order from '@/sections/home/Order/Order';

// const Postcards = dynamic(() => import('@/sections/home/Postcards/Postcards'), { ssr: false });
const Order = dynamic(() => import('@/sections/home/Order/Order'), { ssr: false });

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <PostcardsSelectionProvider>
        <Postcards />
        <Order />
      </PostcardsSelectionProvider>
    </main>
  );
}
