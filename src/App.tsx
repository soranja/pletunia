import React, { Suspense } from "react";
import Header from "./components/Header/Header";
import Hero from "./pages/Hero/Hero";
import Postcards from "./pages/Postcards/Postcards";
import Order from "./pages/Order/Order";
import Footer from "./components/Footer/Footer";
import Copyright from "./components/Copyright/Copyright";

import { useTranslation } from "react-i18next";
import { locales } from "./constants/locales";

function App() {
  const [t, i18n] = useTranslation();

  return (
    <div className="flex flex-col bg-slate-800">
      <Header></Header>
      <main className="flex flex-col bg-slate-900">
        {/* <ul className="z-100 mt-40 text-white m-auto ">
          {Object.keys(locales).map((locale) => (
            <li key={locale}>
              <button
                style={{
                  fontWeight:
                    i18n.resolvedLanguage === locale ? "bold" : "normal",
                }}
                type="submit"
                onClick={() => i18n.changeLanguage(locale)}
              >
                {locales[locale].nativeName}
              </button>
            </li>
          ))}
        </ul>
        <section className="p-10 bg-slate-500">
          <span className="text-3xl font-serif font-extrabold text-red-600">
            {t("construction.description")}
          </span>
        </section> */}
        <Hero></Hero>
        <Postcards></Postcards>
        {/* <section className="p-10 bg-slate-500">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE SPECIALS
          </span>
        </section> */}
        {/* <section className="p-10 bg-slate-500">
          <span className="text-3xl font-serif text-red-600">
            {t('construction.description')}
          </span>
        </section> */}
        {/* <section className="p-10 bg-slate-300">
          <span className="text-3xl font-serif text-red-600">
            THIS IS THE BRACELETS
          </span>
        </section> */}
        <Order></Order>
      </main>
      <Footer></Footer>
      <Copyright></Copyright>
    </div>
  );
}

export default function AppSuspense() {
  return (
    <Suspense fallback="...LO@DING">
      <App />
    </Suspense>
  );
}
