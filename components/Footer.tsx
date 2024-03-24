"use client";

import React, { useState } from "react";
import Image from "next/image";

// translation
import { useTranslation } from "react-i18next";

// import Modal from "./Modal";

const media = {
  open: (url: string) => window.open(url, "_blank", "noreferrer"),
  telegramAlyona: "https://t.me/Alyonka_che",
  instagram: "https://www.instagram.com/i_carry_joy/",
  whatsApp: "https://wa.me/+79940221741",
  telegramIvan: "https://t.me/i_sverdlovsky",
};

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");
  return (
    <footer>
      <div
        className="z-20 flex flex-row min-w-full p-10 bg-layout-dark-green text-white lg:items-center"
        id="contacts"
      >
        <span className="grow text-2xl md:text-3xl font-extrabold">
          PLETUNIA
          <span className="text-black font-serif text-2xl md:text-4xl pl-0.5">
            .
          </span>
        </span>
        <nav className="font-bold">
          <ul
            className="flex flex-col gap-y-4 items-end
          lg:flex-row lg:gap-x-6"
          >
            <li>
              <button onClick={() => setIsOpen(true)}>
                {t("footer.about")}
              </button>
            </li>
            <li>
              <button onClick={() => setIsOpen(true)}>
                {t("footer.news")}
              </button>
            </li>
            <li>
              <button
                className="flex gap-x-2"
                onClick={() => media.open(media.telegramAlyona)}
              >
                Telegram
                <Image
                  src="/images/svgs-icons/telegram.svg"
                  height={24}
                  width={24}
                  alt="telegram-icon"
                ></Image>
              </button>
            </li>
            <li className="flex gap-x-2">
              <button
                className="flex gap-x-2"
                onClick={() => media.open(media.instagram)}
              >
                Instagram
                <Image
                  src="/images/svgs-icons/instagram.svg"
                  height={24}
                  width={24}
                  alt="telegram-icon"
                ></Image>
              </button>
            </li>
            <li>
              <button
                className="flex gap-x-2"
                onClick={() => media.open(media.whatsApp)}
              >
                What&apos;s App
                <Image
                  src="/images/svgs-icons/whats-app.svg"
                  height={24}
                  width={24}
                  alt="telegram-icon"
                ></Image>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="flex flex-col bg-layout-dark-green items-center"
        id="copyright"
      >
        <hr className="border-b-0 border-black w-[300px] lg:w-[800px]" />

        <button
          className="text-white text-sm text-center py-4"
          onClick={() => media.open(media.telegramIvan)}
        >
          {t("copyright")} &copy;
        </button>
      </div>
    </footer>
  );
}

export default Footer;
