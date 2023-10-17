import React from "react";
import Header from "./components/Header/Header";
import Hero from "./pages/Hero/Hero";
import Postcards from "./pages/Postcards/Postcards";
import Order from "./pages/Order/Order";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="flex flex-col bg-slate-800">
      <Header></Header>
      <main className="flex flex-col bg-slate-900">
        <Hero></Hero>
        <Postcards></Postcards>
        {/*
        <section className="p-10 bg-slate-500">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE SPECIALS
          </span>
        </section>
        <section className="p-10 bg-slate-500">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE CONSTRUCTORS SETS
          </span>
        </section>
        <section className="p-10 bg-slate-300">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE BRACELETS
          </span>
        </section>
 */}
        <Order></Order>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;

// responsive for laptops!
// image width (not %% ?)
