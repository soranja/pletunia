import React, { forwardRef } from "react";
import Burger from "../Burger/Burger";
import { buttonStyleHeader } from "../../constants/buttonStyleHeader";

const Header = forwardRef(function Header(props, ref) {
  const handleClick = () => {};
  return (
    <header className="z-20 fixed flex flex-row justify-between items-center w-full p-4 md:p-6 md:px-10 bg-layout-skintone font-sans shadow-xl">
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
            <button className="flex items-center">
              Postcards <div className="hidden text-xxs pl-1.5 mt-0.5">▼</div>
            </button>
          </li>
          <li className="hidden">
            <button>Bracelets</button>
          </li>
          <li>
            <button>Order</button>
          </li>
          <li>
            <button>Contact us</button>
          </li>
        </ul>
      </nav>
      {/*contacts, order, lang buttons*/}
      <div className="gap-x-2.5 text-white font-bold hidden lg:flex">
        <button className={`${buttonStyleHeader} bg-layout-blue-gray`}>
          Ru
        </button>
      </div>
      <Burger></Burger>
    </header>
  );
});

export default Header;
