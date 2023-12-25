import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Hero from "./pages/Hero/Hero";
import Postcards from "./pages/Postcards/Postcards";
import Order from "./pages/Order/Order";
import Footer from "./components/Footer/Footer";
import Copyright from "./components/Copyright/Copyright";

const App: React.FC = () => {
  const [cardsData, setCardsData] = useState<Record<number, boolean>>({});
  const updateCardsData = (selectionMap: Record<number, boolean>) => {
    setCardsData(selectionMap);
  };

  return (
    <div className="flex flex-col">
      <Header></Header>
      <main className="flex flex-col">
        <Hero></Hero>
        <Postcards updateCardsData={updateCardsData}></Postcards>
        <Order cardsData={cardsData}></Order>
      </main>
      <Footer></Footer>
      <Copyright></Copyright>
    </div>
  );
};

export default App;

{
  /* <section className="p-10 bg-slate-500">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE SPECIALS
          </span>
        </section> */
}
{
  /* <section className="p-10 bg-slate-500">
          <span className="text-3xl font-serif text-red-600">
            {t('construction.description')}
          </span>
        </section> */
}
{
  /* <section className="p-10 bg-slate-300">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE BRACELETS
          </span>
        </section> */
}
