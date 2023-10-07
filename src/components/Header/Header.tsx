import React from "react";
import Burger from "../Burger/Burger";
import { buttonStyleHeader } from "../../constants/buttonStyleHeader";

function Header() {
  return (
    <header className="z-20 fixed flex flex-row justify-between items-center w-full p-3 md:p-5 bg-layout-skintone font-sans shadow-xl">
      {/*logo*/}
      <span className="text-2xl md:text-3xl font-extrabold text-black">
        PLETUNIA
        <span className=" text-layout-dark-green font-serif text-2xl md:text-4xl pl-0.5">
          .
        </span>
      </span>
      {/*top bar menu*/}
      <nav className="items-center font-bold hidden lg:flex">
        <ul className="flex gap-x-6 text-base">
          <li>
            <button>Overview</button>
          </li>
          <li>
            <button className="flex items-center ">
              Postcards <div className="text-xxs pl-1.5 mt-0.5">▼</div>
            </button>
          </li>
          <li>
            <button>Bracelets</button>
          </li>
          <li>
            <button>How to Order</button>
          </li>
          <li>
            <button>Contact Us</button>
          </li>
        </ul>
      </nav>
      {/*contacts, order, lang buttons*/}
      <div className="gap-x-2.5 text-white font-bold hidden lg:flex">
        <button className={`${buttonStyleHeader} bg-layout-dark-green`}>
          Contact
        </button>
        <button className={`${buttonStyleHeader}  bg-layout-blue-gray`}>
          Order
        </button>
        <button className={`${buttonStyleHeader} bg-layout-blue-gray`}>
          Lang
        </button>
      </div>
      <Burger></Burger>
    </header>
  );
}

export default Header;
