import React from "react";
import PostcardSlider from "../../components/PostcardSlider/PostcardSlider";

function Postcards() {
  return (
    <section className="p-6 pt-20 bg-postcards-pattern bg-cover flex flex-col items-center">
      <h3 className="text-layout-red-clay text-4xl md:text-6xl font-extrabold my-5">
        POSTCARDS
      </h3>
      <span
        className="text-white text-xl text-justify md:text-center px-4 font-semibold
            md:px-0 md:text-2xl "
      >
        A variety of postcards: templated and custom. Contact us if you want to
        order an individual design!
      </span>
      <PostcardSlider></PostcardSlider>
    </section>
  );
}

export default Postcards;
