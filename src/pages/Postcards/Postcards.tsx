import React from "react";
import PostcardSlider from "../../components/PostcardSlider/PostcardSlider";

function Postcards() {
  return (
    <section className="p-10 bg-postcards-pattern flex flex-col items-center">
      <h3 className="text-6xl text-layout-red-clay font-extrabold my-5 ">
        POSTCARDS
      </h3>
      <span className="text-white ">
        A variety of postcards: templated and custom. Contact us if you want to
        order an individual design!
      </span>
      <PostcardSlider></PostcardSlider>
    </section>
  );
}

export default Postcards;
