"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import Postcards from "./pages/Postcards";
import Order from "./pages/Order";
import Footer from "./components/Footer";

import { useTranslation } from "react-i18next";
import { SelectedCards } from "./types/postcardTypes";

// Redux logic
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  // Translation function
  const { t } = useTranslation();

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
};

export default App;
