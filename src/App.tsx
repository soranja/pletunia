import React, { useRef } from "react";
import Header from "./components/Header/Header";
import Hero from "./pages/Hero/Hero";
import Postcards from "./pages/Postcards/Postcards";
import Order from "./pages/Order/Order";
import Footer from "./components/Footer/Footer";
import Copyright from "./components/Copyright/Copyright";

function App() {
  // const ref = useRef<React.MutableRefObject<HTMLDivElement | null>>(null);
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
      <Copyright></Copyright>
    </div>
  );
}

export default App;

// responsive for laptops!
// image width (not %% ?)
// read about SVG https://css-tricks.com/scale-svg/#aa-the-height-and-width-attributes

/*
- top bar - make interactive and with scroll + mobile drawer
- LANG - translate the app and make the button functionable
- hero.order - make the button interactive: a modal with a form or scroll to the form
- postcards.order - when clicked scroll to the form in the end and tick the corresponding item
- FOR SPECIAL - add illumination trail for mouse (desktop)
- Order form - when submitted send the info to Alyona's TG.
- Footer - make the links clickable, news and about us - modals.
*/
