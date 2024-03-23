/* eslint-disable @next/next/no-img-element */
"use client";

import React, { FormEvent, useState } from "react";
import { initialSize } from "@/constants/initialSize";

// data
import postcards from "../data/postcards.json";
import { CardType } from "../types/cardType";

// translation
import { useTranslation } from "react-i18next";

// redux
import { useAppSelector } from "../hooks/selector";
import { useActions } from "../hooks/actions";

// local storage
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Order = () => {
  const { t }: any = useTranslation(["home", "common"]);
  // 'any' for reason t func errors -- 'For now, this is the only possible workaround. This is a TypeScript limitation that will be address at some point in the future.'

  const { setItem, getItem, removeItem } = useLocalStorage("postcardsOrder");

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

  // Print names of selected postcards
  const selectedPostcards = postcards
    .filter((card) => selectedCardsIds.includes(card.id))
    .map((card) =>
      navigator.language.includes("ru") ? card.nameRu : card.nameEn
    );

  // States for the order form & message
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [userComment, setUserComment] = useState<string>("");

  // Submit order to TG bot
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

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
        <div className="flex flex-col gap-3 mb-8">
          <form
            className="info-inputs flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-x-6 flex-col md:flex-row">
              {postcards.map((card: CardType, index: number) => (
                <div key={card.id} className="flex gap-2 checked:bg-black">
                  <input
                    type="checkbox"
                    className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
                    id={`${card.id}`}
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
            <div className="flex flex-col gap-2">
              <label htmlFor="name">{t("orderForm.name")}</label>
              <input
                required
                className="text-black px-5 lg:w-80 py-2 rounded-lg"
                type="text"
                id="name"
                name="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">{t("orderForm.email")}</label>
              <input
                required
                className="text-black px-5 lg:w-80 py-2 rounded-lg"
                type="text"
                id="email"
                name="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">{t("orderForm.phone")}</label>
              <input
                required
                className="text-black px-5 lg:w-80 py-2 rounded-lg"
                type="tel"
                id="phone"
                name="phone"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="comment">{t("orderForm.comment")}</label>
              <textarea
                className="text-black px-5 lg:w-80 py-5 rounded-xl"
                id="comment"
                name="comment"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              ></textarea>
            </div>
            <input
              className="mt-8 rounded-2xl p-5 w-40 lg:w-80 tracking-wider bg-layout-blue-gray font-bold text-xl cursor-pointer"
              type="submit"
              // onClick={() => setItem(newOrder)}
              value={`${t("common:buttons.orderButton")}!`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
