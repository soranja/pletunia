import React from "react";
import HeroPostcard from "../../data/img/raw/postcards/iron-giant-hero.jpg";
import Charm from "../../data/img/cut/bracelets_alpha/charm.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="bg-hero bg-cover grow grid grid-cols-1 lg:grid-cols-hero mt-20 px-20 lg:pl-40 lg:pr-0 text-white relative">
      <div className="lg:hidden absolute -top-32 right-8 md:-top-28 md:right-8 rotate-7 md:w-7/12">
        <img className="" src={Charm} alt="charm" />
      </div>
      <div className="z-10 mb-20 gap-y-6 md:gap-y-10 lg:mb-0 flex flex-col items-start justify-end lg:justify-evenly">
        <h2 className="font-serif text-4xl text-center lg:text-left lg:leading-tight lg:text-6xl 2xl:text-8xl ">
          Bonds we <span className="italic">create</span> can hardly be broken
        </h2>
        <div className="hero-description text-center lg:text-left lg:text-2xl 2xl:w-7/12">
          <p>
            Postcards, bracelets, and whatever keeps your friendship strong and
            valued.
          </p>
          <p>
            Free delivery in Yerevan, HayPost in Armenia. Need a worldwide
            delivery? – Contact us!
          </p>
        </div>
        <button className="rounded-full p-5 px-10 tracking-wider bg-layout-dark-green font-bold text-xl self-center lg:self-start">
          Odrer
        </button>
      </div>
      <div className="hidden lg:flex justify-end items-end overflow-hidden relative">
        <img
          className="w-full rounded-3xl rotate-7 absolute -bottom-10 -right-11"
          src={HeroPostcard}
          alt="hero postcard"
        />
      </div>
    </section>
  );
}

export default Hero;
