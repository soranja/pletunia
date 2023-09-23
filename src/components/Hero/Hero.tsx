import React from "react";
import HeroPostcard from "../../data/img/raw/postcards/iron-giant-hero.jpg";
import "./Hero.css";

function Hero() {
  return (
    <section className="bg-hero bg-cover grow grid grid-cols-hero mt-20 pl-40 text-white">
      <div className="flex flex-col items-start justify-evenly">
        <h2 className="font-serif md:text-4xl lg:leading-tight lg:text-6xl 2xl:text-8xl ">
          Bonds we <span className="italic">create</span> can hardly be broken
        </h2>
        <div className="hero-description lg:text-2xl 2xl:w-7/12">
          <p>
            Postcards, bracelets, and whatever keeps your friendship strong and
            valued.
          </p>
          <p>
            Free delivery in Yerevan, HayPost in Armenia. Need a worldwide
            delivery? – Contact us!
          </p>
        </div>
        <button className="rounded-full p-5 px-10 tracking-wider bg-layout-dark-green font-bold text-xl">
          Odrer
        </button>
      </div>
      <div className="hidden lg:flex justify-end items-end overflow-hidden relative">
        <img
          className=" lg:w-12/12 rounded-3xl rotate-7 absolute -bottom-10 -right-11"
          src={HeroPostcard}
          alt="hero postcard"
        />
      </div>
    </section>
  );
}

export default Hero;
