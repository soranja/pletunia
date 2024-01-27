import React, { FormEvent, useState, useEffect } from "react";
import GreenGirl from "../data/img/cut/green_girl.jpg";
import { useTranslation } from "react-i18next";
import { CardType } from "../types/cardType";
import axios from "axios";
import { SelectedCards } from "../types/postcardTypes";
import i18n from "../i18n";

interface OrderProps {
  cardsData: Record<number, boolean>;
}

const Order: React.FC<SelectedCards> = ({ selectedIds, areSelected }) => {
  const initialSize = window.innerWidth;
  const { t } = useTranslation("translation", { i18n });
  const cardsArray = t("postcards.cards", { returnObjects: true });

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [userComment, setUserComment] = useState<string>("");
  const [userOrder, setUserOrder] = useState<string[]>([]);

  // console.log("CARDS FROM POSTCARDS, IN ORDER:", selectedIds, areSelected);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const botToken = process.env.REACT_APP_TOKEN;
    const chatId = process.env.REACT_APP_CHAT_ID;

    const message =
      "Name: " +
      userName +
      "\nEmail: " +
      userEmail +
      "\nPhone: " +
      userPhone +
      "\nOrder: " +
      userOrder +
      "\nComment: " +
      userComment;

    try {
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      alert("Message sent successfully!");

      setUserName("");
      setUserEmail("");
      setUserPhone("");
      setUserComment("");
      setUserOrder([]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div
      className="text-white 
      flex flex-col  pt-20 pb-20 px-10 pr-28
      lg:text-xl lg:grid grid-cols-order lg:grid-rows-order lg:pl-0 lg:items-start"
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(24, 64, 23, 0.8)), url(${GreenGirl})`,
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
          src={GreenGirl}
          alt="Green Girl"
        />
      </div>

      <div className="right-column lg:pl-24 flex flex-col gap-4 items-start justify-start">
        <h4 className="text-2xl lg:text-3xl font-bold">
          {t("orderForm.choose")}
        </h4>
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex gap-x-6 flex-col md:flex-row">
            {/* {cardsArray.map((card: CardType, index: number) => (
              <div key={card.itemNo} className="flex gap-2 checked:bg-black">
                <input
                  type="checkbox"
                  className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
                  id={`${card.itemNo}`}
                  value={card.name}
                  defaultChecked={areSelected[card.itemNo]}
                />
                <label htmlFor={`${card.itemNo}`}>{card.name}</label>
              </div>
            ))} */}
          </div>
          <form
            className="info-inputs flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
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
              value={`${t("orderButton")}!`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
