'use client';

// Components
import Hero from '@/components/Hero';
// import Postcards from "@/components/Postcards";
// import Order from "@/components/Order";

// Redux
import { Provider } from 'react-redux';
import { store } from '@/store/store';

// For noSSR
import dynamic from 'next/dynamic';

const Postcards = dynamic(() => import('@/components/Postcards'), {
  ssr: false,
});

const Order = dynamic(() => import('@/components/Order'), {
  ssr: false,
});

export default function Home() {
  return (
    <Provider store={store}>
      <main>
        <Hero />
        <Postcards />
        <Order />
      </main>
    </Provider>
  );
}
