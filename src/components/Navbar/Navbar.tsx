import React from "react";
import { buttonStyleHeader } from "../../constants/buttonStyleHeader";
import { Link } from "react-scroll";

import { useTranslation } from "react-i18next";

type CheckMobile = {
  isMobile: boolean;
};

function NavBar({ isMobile }: CheckMobile): React.JSX.Element {
  const [t, i18n] = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <nav className="items-center font-bold">
        <ul
          className={`text-base cursor-pointer font-bold ${
            isMobile
              ? "flex flex-col gap-y-6"
              : "hidden lg:flex gap-x-6 items-center"
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
              {t("navbar.postcards")}{" "}
              <div className="hidden text-xxs pl-1.5 mt-0.5">▼</div>
            </Link>
          </li>
          <li className="hidden">{t("navbar.bracelets")}</li>
          <li>
            <Link
              to="order"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              {t("orderButton")}
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
              {t("navbar.contacts")}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="gap-x-2.5 text-white flex">
        <button
          onClick={() => changeLanguage("en")}
          className={`${buttonStyleHeader} 
          bg-layout-blue-gray 
            ${isMobile ? "flex" : "hidden lg:flex"}
            ${i18n.resolvedLanguage === "en" ? "font-bold underline" : ""}
            `}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("ru")}
          className={`${buttonStyleHeader} 
          bg-layout-blue-gray 
            ${isMobile ? "flex" : "hidden lg:flex"}
            ${i18n.resolvedLanguage === "ru" ? "font-bold underline" : ""}
            `}
        >
          RU
        </button>
      </div>
    </>
  );
}

export default NavBar;
