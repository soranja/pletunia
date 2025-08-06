'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Translation
import { useTranslation } from 'react-i18next';

// import Modal from "./Modal";

const media = {
  open: (url: string) => window.open(url, '_blank', 'noreferrer'),
  telegramAlyona: 'https://t.me/Alyonka_che',
  instagram: 'https://www.instagram.com/i_carry_joy/',
  whatsApp: 'https://wa.me/+79940221741',
  telegramIvan: 'https://t.me/s_oranja',
};

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  return (
    <footer>
      <div
        className="bg-layout-dark-green z-20 flex min-w-full flex-row p-10 text-white lg:items-center"
        id="contacts"
      >
        <span className="grow text-2xl font-extrabold md:text-3xl">
          PLETUNIA
          <span className="pl-0.5 font-serif text-2xl text-black md:text-4xl">.</span>
        </span>
        <nav className="font-bold">
          <ul className="flex flex-col items-end gap-y-4 lg:flex-row lg:gap-x-6">
            {/* <li>
              <button onClick={() => setIsOpen(true)}>
                {t("footer.about")}
              </button>
            </li>
            <li>
              <button onClick={() => setIsOpen(true)}>
                {t("footer.news")}
              </button>
            </li> */}
            <li>
              <button className="flex gap-x-2" onClick={() => media.open(media.telegramAlyona)}>
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
              <button className="flex gap-x-2" onClick={() => media.open(media.instagram)}>
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
              <button className="flex gap-x-2" onClick={() => media.open(media.whatsApp)}>
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

      <div className="bg-layout-dark-green flex flex-col items-center" id="copyright">
        <hr className="w-[300px] border-b-0 border-black lg:w-[800px]" />

        <button
          className="py-4 text-center text-sm text-white"
          onClick={() => media.open(media.telegramIvan)}
        >
          {t('copyright')} &copy;
        </button>
      </div>
    </footer>
  );
}
