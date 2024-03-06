"use client";

// components
import Hero from "@/components/Hero";
// import Postcards from "@/components/Postcards";
// import Order from "@/components/Order";

// redux
import { Provider } from "react-redux";
import { store } from "@/store/store";

// for noSSR
import dynamic from "next/dynamic";

const Postcards = dynamic(() => import("@/components/Postcards"), {
  ssr: false,
});

const Order = dynamic(() => import("@/components/Order"), {
  ssr: false,
});

export default function Home() {
  return (
    <Provider store={store}>
      <main>
        <Hero></Hero>
        <Postcards></Postcards>
        <Order></Order>
      </main>
    </Provider>
  );
}
