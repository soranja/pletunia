import React from "react";

const buttonStyle = "rounded-full bg-layout-dark-green p-2 px-5 tracking-wider";

function Header() {
  return (
    <header className="fixed flex flex-row justify-between items-center min-w-full p-5 bg-layout-skintone font-sans shadow-xl">
      <span className="text-3xl font-extrabold  text-black">
        PLETUNIA
        <span className=" text-layout-dark-green font-serif text-4xl pl-0.5">
          .
        </span>
      </span>
      <nav className="flex items-center font-bold">
        <ul className="flex gap-x-10 text-base">
          <li>Overview</li>
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
      <div className="flex gap-x-2.5 text-white font-bold">
        <button className={buttonStyle}>Contact</button>
        <button className={`${buttonStyle} bg-layout-blue-gray`}>Order</button>
        <button className={`${buttonStyle} bg-layout-blue-gray`}>Lang</button>
      </div>
    </header>
  );
}

export default Header;
