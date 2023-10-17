import React from "react";
import PostcardSlider from "../../components/PostcardSlider/PostcardSlider";

function Postcards() {
  return (
    <section
      className="pt-16 pb-16 bg-postcards-pattern bg-cover flex flex-col  
      lg:items-center"
    >
      <h3
        className="text-layout-red-clay text-4xl pl-14 font-extrabold my-5
        md:text-6xl lg:pl-0"
      >
        POSTCARDS
      </h3>
      <span
        className="text-white text-xl text-justify md:text-center px-14 
        lg:px-0 md:text-2xl
        lg:font-semibold"
      >
        A variety of postcards: templated and custom. Contact us if you want to
        order an individual design!
      </span>
      <PostcardSlider></PostcardSlider>
    </section>
  );
}

export default Postcards;
