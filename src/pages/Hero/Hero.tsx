import React from "react";
import HeroPostcard from "../../data/img/raw/postcards/iron-giant-hero.jpg";
import Lighthouse from "../../data/img/cut/lighthouse.png";
import "./Hero.css";

function Hero() {
  return (
    <section
      className="
      bg-hero bg-cover grow grid pl-10 pr-5 grid-cols-hero text-white 
      md:px-20 md:pl-5 md:pr-0 
      lg:pl-40 lg:mt-20"
    >
      <div
        className="mt-5 gap-y-6 flex flex-col items-center justify-center
        md:gap-y-10  
        lg:justify-evenly lg:items-start"
      >
        <h2
          className="font-serif text-3xl mt-5 text-left 
          md:text-6xl 
          lg:leading-tight
          2xl:text-8xl"
        >
          Bonds we <span className="italic">create</span> can hardly be broken
        </h2>
        <div
          className="hero-description text-left 
          lg:text-2xl 
          2xl:w-7/12"
        >
          <p>
            Postcards, bracelets, and whatever keeps your friendship strong and
            valued.
          </p>
          <p>
            Free delivery in Yerevan, HayPost in Armenia. Need a worldwide
            delivery? – Contact us!
          </p>
        </div>
        <button className="rounded-full p-5 px-10 tracking-wider bg-layout-dark-green font-bold text-xl self-start">
          Odrer
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
      <div className="flex flex-col mt-16 justify-evenly items-center overflow-hidden lg:hidden">
        <img className="w-3/12 md:hidden" src={Lighthouse} alt="charm" />
        <img className="w-5/12 md:hidden" src={Lighthouse} alt="charm" />
        <img className="w-10/12" src={Lighthouse} alt="charm" />
      </div>
    </section>
  );
}

export default Hero;
