/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { initialSize } from "@/constants/initialSize";

// translation
import { useTranslation } from "react-i18next";

// data
import postcards from "../data/postcards.json";
import { CardType } from "../types/cardType";

// redux
import { useAppSelector } from "../hooks/selector";
import { useActions } from "../hooks/actions";

// ui
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";

function isInputNamedElement(
  e: Element
): e is HTMLInputElement & { name: string } {
  return "value" in e && "name" in e;
}

function OrderForm() {
  const [state, setState] = useState<string>();

  const { t }: any = useTranslation(["home", "common"]);
  // 'any' for reason t func errors -- 'For now, this is the only possible workaround. This is a TypeScript limitation that will be address at some point in the future.'

  const { checkedCards, selectedCardsIds } = useAppSelector(
    (state) => state.selector
  );
  const { setSelectedCardsIds, setCheckedCards } = useActions();

  // Duplicates handleAddButtonClick, so both components can update the same state
  const handleTick = (id: number) => {
    // Add cards Ids to an array, Ids are sorted
    setSelectedCardsIds(
      selectedCardsIds.includes(id)
        ? selectedCardsIds
            .filter((prevId) => prevId !== id)
            .sort(function (a, b) {
              return a - b;
            })
        : [...selectedCardsIds, id].sort(function (a, b) {
            return a - b;
          })
    );

    // Update checkedCards array
    function updatedCheckedCards(prevCheckedCards: boolean[]) {
      const updatedCheckedCardsArray = [...prevCheckedCards];
      const indexToUpdate = postcards.findIndex((card) => card.id === id);

      if (indexToUpdate !== -1) {
        updatedCheckedCardsArray[indexToUpdate] =
          !updatedCheckedCardsArray[indexToUpdate];
      }
      return updatedCheckedCardsArray;
    }

    setCheckedCards(updatedCheckedCards(checkedCards));
  };

  // Print names of selected postcards (relies on user's browser)
  const selectedPostcards = postcards
    .filter((card) => selectedCardsIds.includes(card.id))
    .map((card) =>
      navigator.language.includes("ru") ? card.nameRu : card.nameEn
    );

  // Collect data and send it to POST API
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setState("loading");

    const formData: Record<string, string | string[] | number[]> = {};

    Array.from(e.currentTarget.elements)
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (!field.name) return;
        if (field.type === "checkbox") {
          if (!formData[field.name]) {
            formData[field.name] = [];
          }
          if ((field as HTMLInputElement).checked) {
            (formData[field.name] as string[]).push(field.value);
          }
        } else {
          formData[field.name] = field.value;
        }
      });

    setState("loading");

    console.log(formData);

    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        selectedPostcards: selectedPostcards.map(
          (postcard: string) =>
            // Extra space at the beginning
            " " + postcard.charAt(0).toUpperCase() + postcard.slice(1)
        ),
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        lang: navigator.language,
      }),
    });

    setState("ready");
  }

  return (
    <div
      className="text-white 
    flex flex-col  pt-20 pb-20 px-10 pr-28
    lg:text-xl lg:grid grid-cols-order lg:grid-rows-order lg:pl-0 lg:items-start"
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(24, 64, 23, 0.8)), url("/images/pages/green_girl.jpg")`,
        backgroundSize: `${initialSize <= 1168 ? "17%" : "14%"}`,
        backgroundPositionY: `67%`,
        backgroundPositionX: `49%`,
      }}
      id="order"
    >
      <div
        className="
      left-column flex flex-col lg:items-end
      lg:pr-24"
      >
        <h3
          className="text-3xl font-extrabold mb-12 
          md:pr-0 
          lg:text-5xl lg:text-right"
        >
          {t("orderForm.headline")}
        </h3>

        <img
          className="
          hidden rounded-r-3xl
          lg:block lg:w-5/12 xl:w-4/12"
          src="/images/pages/green_girl.jpg"
          alt="Green Girl"
        />
      </div>
      <div className="right-column lg:pl-24 flex flex-col gap-4 items-start justify-start">
        <h4 className="text-2xl lg:text-3xl font-bold">
          {t("orderForm.choose")}
        </h4>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex gap-x-6 flex-col md:flex-row">
            {postcards.map((card: CardType, index: number) => (
              <div key={card.id} className="flex gap-2 checked:bg-black">
                <input
                  type="checkbox"
                  className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
                  id={`${card.id}`}
                  name="selectedPostcards"
                  value={card.name}
                  checked={checkedCards[index]}
                  onChange={() => handleTick(card.id)}
                />
                <label htmlFor={`${card.id}`}>
                  {t(`postcards.cards.${card.name}.name` as const)}
                </label>
              </div>
            ))}
          </div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" />
          <Label htmlFor="comment">Comment</Label>
          <textarea
            id="comment"
            name="comment"
            className="text-black px-5 lg:w-80 py-5 rounded-xl"
          ></textarea>
          <button
            className="mt-8 rounded-2xl p-5 w-40 lg:w-80 tracking-wider bg-layout-blue-gray font-bold text-xl cursor-pointer"
            disabled={state === "loading"}
          >
            {`${t("common:buttons.orderButton")}!`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;