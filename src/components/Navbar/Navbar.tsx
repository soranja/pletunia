import React, { FC } from "react";
import { buttonStyleHeader } from "../../constants/buttonStyleHeader";
import { Link } from "react-scroll";

const NavBar: FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <>
    <nav className="items-center font-bold">
      <ul
        className={`text-base cursor-pointer font-bold ${
          isMobile ? "flex flex-col gap-y-6" : "hidden lg:flex gap-x-6 items-center"
        }`}
      >
        <li>
          <Link
            to="postcards"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="flex items-center"
          >
            Postcards <div className="hidden text-xxs pl-1.5 mt-0.5">▼</div>
          </Link>
        </li>
        <li className="hidden">Bracelets</li>
        <li>
          <Link
            to="order"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Order
          </Link>
        </li>
        <li>
          <Link
            to="contacts"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            Contact us
          </Link>
        </li>
      </ul>
    </nav>
    <div className="gap-x-2.5 text-white font-bold hidden lg:flex">
      <button className={`${buttonStyleHeader} bg-layout-blue-gray`}>Ru</button>
    </div>
  </>
);

export default NavBar;
