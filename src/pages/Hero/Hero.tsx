import React from "react";
import HeroPostcard from "../../data/img/raw/postcards/iron-giant-hero.jpg";
import Lighthouse from "../../data/img/cut/lighthouse.png";
import "./Hero.css";
import { useTranslation } from "react-i18next";

function Hero() {
  const [t, i18n] = useTranslation();
  return (
    <section
      className="
      bg-hero bg-cover h-screen grid pl-10 pr-5 grid-cols-hero text-white mt-10
      md:px-20 md:pl-10 md:pr-0 
      lg:pl-40"
      id="hero"
    >
      <div
        className="gap-y-6 flex flex-col items-center justify-center
        md:gap-y-10 md:mt-16 md:pl-0
        lg:gap-y-28 lg:items-start"
      >
        <h2
          className={`font-serif font-extrabold text-3xl mt-5 mb-5 text-left 
          md:text-6xl 
          lg:leading-tight
          2xl:text-8xl
          `}
        >
          {/* Bonds we <span className="italic">create</span> ???? can hardly be broken */}
          {t("hero.slogan")}
        </h2>
        <div
          className="hero-description text-left 
          lg:text-2xl 
          2xl:w-7/12"
        >
          <p>
            {/* Postcards, bracelets, and whatever keeps your friendship strong and
            valued. */}
            {t("hero.aboutGoods")}
          </p>
          <p>
            {/* Free delivery in Yerevan, HayPost in Armenia. Need a worldwide
            delivery? – Contact us! */}
            {t("hero.aboutDelivery")}
          </p>
        </div>
        <button className="rounded-full p-5 px-10 tracking-wider bg-layout-dark-green font-bold text-xl self-start">
          Order
        </button>
      </div>
      <div
        className="hidden justify-end items-end overflow-hidden relative
        lg:flex"
      >
        <img
          className="w-full rounded-3xl rotate-7 absolute -bottom-10 -right-11"
          src={HeroPostcard}
          alt="hero postcard"
        />
      </div>
      <div className="flex flex-col mt-10 justify-evenly items-center overflow-hidden lg:hidden">
        <img className="w-3/12 md:hidden" src={Lighthouse} alt="charm" />
        <img className="w-5/12 md:hidden" src={Lighthouse} alt="charm" />
        <img className="w-10/12" src={Lighthouse} alt="charm" />
      </div>
    </section>
  );
}

export default Hero;
