import React from "react";
import GreenGirl from "../../data/img/cut/green_girl.jpg";

function Order() {
  const initialSize = window.innerWidth;

  return (
    <div
      className="text-white 
      flex flex-col pt-20 pb-20 px-10
      lg:text-xl lg:grid grid-cols-order lg:grid-rows-order lg:pl-0 lg:bg-layout-dark-green"
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(24, 64, 23, 0.8)), url(${GreenGirl})`,
        backgroundSize: `${initialSize <= 768 ? "17%" : "14%"}`,
        backgroundPositionY: `68%`,
        backgroundPositionX: `51%`,
      }}
      // adapt bg image for desktop
      // FIX INPUTS
    >
      <div
        className="
      left-column flex flex-col items-end
      lg:pr-24"
      >
        <h3
          className="
        text-4xl lg:text-5xl font-extrabold mb-16"
        >
          PLACE YOUR ORDER HERE
        </h3>
        <img
          className="
          hidden rounded-r-3xl
          lg:block lg:w-4/12"
          src={GreenGirl}
          alt="Green Girl"
        />
      </div>

      <div className="right-column lg:pl-24 flex flex-col gap-4 items-start justify-start">
        <h4 className="text-2xl lg:text-3xl font-bold">Choose your item(s):</h4>
        <div className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="item001 flex  gap-2">
            <input type="checkbox" id="item0001" value="Coraline" />
            <label htmlFor="item001">Coraline</label>
          </div>
          <div className="item002 flex gap-2">
            <input type="checkbox" id="item0002" value="PumpkinJack" />
            <label htmlFor="item002">Pumpkin Jack</label>
          </div>
          <div className="item003 flex gap-2">
            <input type="checkbox" id="item0003" value="Custom" />
            <label htmlFor="item003">Custom</label>
          </div>
        </div>
        <div className="info-inputs flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Your name</label>
            <input
              className="lg:px-16 py-2 rounded-lg"
              type="text"
              id="name"
              name="name"
              value="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Your email</label>
            <input
              className="lg:px-16 py-2 rounded-lg"
              type="text"
              id="email"
              name="email"
              value="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Your phone</label>
            <input
              className="lg:px-16 py-2 rounded-lg"
              type="tel"
              id="phone"
              name="phone"
              value="phone"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="comment">Comment / Extra Contact</label>
            <input
              className="px-8 py-14 rounded-xl"
              type="text"
              id="comment"
              name="comment"
              value="comment"
            />
          </div>
        </div>
        <input
          className="mt-4 rounded-full p-5 px-10 tracking-wider bg-layout-blue-gray font-bold text-xl"
          type="submit"
          value="Order!"
        />
      </div>
    </div>
  );
}

export default Order;
