import React from "react";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col items-center  bg-slate-800">
      <header className="flex flex-row gap-5 min-w-full p-5 bg-slate-300">
        <span className="grow text-3xl font-serif text-red-600">
          THIS IS THE HEADER
        </span>
        <nav>
          <ul className="flex gap-x-2.5">
            <li>Overview</li>
            <li>Postcards</li>
            <li>Bracelets</li>
            <li>How to order</li>
            <li>Contacts</li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col min-w-full p-10 bg-slate-600">
        <section className=" m-5 p-5 bg-slate-300">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE HERO
          </span>
        </section>
      </main>
    </div>
  );
}

export default App;
