"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/pages/Hero";
import Postcards from "@/pages/Postcards";
import Order from "@/pages/Order";

import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col">
        <Header></Header>
        <main className="flex flex-col">
          <Hero></Hero>
          <Postcards></Postcards>
          <Order></Order>
        </main>
        <Footer></Footer>
      </div>
    </Provider>
  );
}
