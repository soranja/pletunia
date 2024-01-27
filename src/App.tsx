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
  const [t] = useTranslation();
  // Access to JSON object array
  const cardsArray = t("postcards.cards", { returnObjects: true });

  const [selectedCards, setSelectedCards] = useState<SelectedCards>({
    selectedIds: new Array(cardsArray.length).fill(9999),
    areSelected: new Array(cardsArray.length).fill(false),
  });

  // Function to update selected data
  const handleSelectionChange = (id: number) => {
    setSelectedCards((prevSelected: SelectedCards) => {
      const updatedSelectedIds = prevSelected.selectedIds.includes(id)
        ? prevSelected.selectedIds.map((value: number, i: number) =>
            i === id ? 9999 : value
          )
        : prevSelected.selectedIds.map((value: number, i: number) =>
            i === id ? id : value
          );

      const updatedAreSelected = prevSelected.selectedIds.includes(id)
        ? prevSelected.areSelected.map((value: boolean, i: number) =>
            i === id ? false : value
          )
        : prevSelected.areSelected.map((value: boolean, i: number) =>
            i === id ? true : value
          );

      const selectionMap: Record<number, boolean> = {};
      updatedSelectedIds
        .filter((value) => typeof value === "number")
        .forEach((selectedId) => {
          selectionMap[selectedId] = true;
        });

      prevSelected.selectedIds
        .filter((prevId) => !updatedSelectedIds.includes(prevId))
        .forEach((deselectedId) => {
          if (typeof deselectedId === "number") {
            selectionMap[deselectedId] = false;
          }
        });

      return {
        selectedIds: updatedSelectedIds,
        areSelected: updatedAreSelected,
      };
    });
  };

  // const [areSelected, setAreSelected] = useState<boolean[]>([]);

  // useEffect(() => {
  //   console.log("APP", areSelected);
  // }, [areSelected]);

  // const handleSelectionChange = (selectionMap: Record<number, boolean>) => {
  //   const updatedAreSelected = Object.values(selectionMap);
  //   setAreSelected(updatedAreSelected);
  // };

  return (
    <Provider store={store}>
      <div className="flex flex-col">
        <Header></Header>
        <main className="flex flex-col">
          <Hero></Hero>
          <Postcards
            selectedIds={selectedCards.selectedIds}
            areSelected={selectedCards.areSelected}
          ></Postcards>
          <Order
            selectedIds={selectedCards.selectedIds}
            areSelected={selectedCards.areSelected}
          ></Order>
        </main>
        <Footer></Footer>
      </div>
    </Provider>
  );
};

export default App;
