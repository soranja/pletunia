import React from "react";
import GreenGirl from "../../data/img/cut/green_girl.jpg";
import { useTranslation } from "react-i18next";

function Order() {
  const initialSize = window.innerWidth;
  const [t, i18n] = useTranslation();

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
        <div className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="item001 flex gap-2 checked:bg-black">
            <input
              type="checkbox"
              className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
              id="item0001"
              value="Coraline"
            />
            <label htmlFor="item001">Coraline</label>
          </div>
          <div className="item002 flex gap-2">
            <input
              type="checkbox"
              className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
              id="item0002"
              value="PumpkinJack"
            />
            <label htmlFor="item002">Pumpkin Jack</label>
          </div>
          <div className="item003 flex gap-2">
            <input
              type="checkbox"
              className="text-green-600 bg-gray-100 border-gray-300 rounded accent-green-600"
              id="item0003"
              value="Custom"
            />
            <label htmlFor="item003">Custom</label>
          </div>
        </div>
        <div className="info-inputs flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">{t("orderForm.name")}</label>
            <input
              className="text-black px-5 lg:w-80 py-2 rounded-lg"
              type="text"
              id="name"
              name="name"
              defaultValue=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">{t("orderForm.email")}</label>
            <input
              className="text-black px-5 lg:w-80 py-2 rounded-lg"
              type="text"
              id="email"
              name="email"
              defaultValue=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">{t("orderForm.phone")}</label>
            <input
              className="text-black px-5 lg:w-80 py-2 rounded-lg"
              type="tel"
              id="phone"
              name="phone"
              defaultValue=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="comment">{t("orderForm.comment")}</label>
            <textarea
              className="text-black px-5 lg:w-80 py-5 rounded-xl"
              id="comment"
              name="comment"
              defaultValue=""
            />
          </div>
          <input
            className="mt-8 rounded-2xl p-5 px-10 w-40 lg:w-80 tracking-wider bg-layout-blue-gray font-bold text-xl cursor-pointer"
            type="submit"
            value={`${t("orderButton")}!`}
          />
        </div>
      </div>
    </div>
  );
}
// make comment expandable
export default Order;
