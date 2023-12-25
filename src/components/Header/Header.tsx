import React from "react";
import Drawer from "../Drawer/Drawer";
import { Link } from "react-scroll";
import Navbar from "../Navbar/Navbar";

function Header() {
  return (
    <header
      className="fixed
    flex flex-row justify-between items-center 
    w-full p-4 bg-layout-skintone font-sans shadow-xl z-20
    md:p-6 md:px-10 
    "
    >
      <span
        className="font-extrabold text-black grow
        text-2xl 
        md:text-3xl"
      >
        <Link
          to="hero"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          className="cursor-pointer"
        >
          PLETUNIA
          <span className=" text-layout-dark-green font-serif text-2xl md:text-4xl pl-0.5">
            .
          </span>
        </Link>
      </span>

      <Navbar isMobile={false}></Navbar>
      <Drawer></Drawer>
    </header>
  );
}

export default Header;
