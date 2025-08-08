'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { SOCIAL_LINKS, CURRENT_YEAR, SOCIAL_ICONS } from '@/constants';

export const Footer = () => {
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

        <ul className="flex cursor-pointer flex-col items-end gap-y-4 lg:flex-row lg:gap-x-4">
          <li>
            <a onClick={() => SOCIAL_LINKS.open(SOCIAL_LINKS.telegramAlyona)}>
              <Image
                src={SOCIAL_ICONS.telegram.src}
                height={24}
                width={24}
                alt={SOCIAL_ICONS.telegram.alt}
              />
            </a>
          </li>
          <li className="flex gap-x-2">
            <a onClick={() => SOCIAL_LINKS.open(SOCIAL_LINKS.instagram)}>
              <Image
                src={SOCIAL_ICONS.insta.src}
                height={24}
                width={24}
                alt={SOCIAL_ICONS.insta.alt}
              />
            </a>
          </li>
          <li>
            <a onClick={() => SOCIAL_LINKS.open(SOCIAL_LINKS.whatsApp)}>
              <Image
                src={SOCIAL_ICONS.whatsApp.src}
                height={24}
                width={24}
                alt={SOCIAL_ICONS.whatsApp.alt}
              />
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-layout-dark-green flex flex-col items-center" id="copyright">
        <hr className="w-[300px] border-b-0 border-black lg:w-[800px]" />

        <button
          className="py-4 text-center text-sm text-white"
          onClick={() => SOCIAL_LINKS.open(SOCIAL_LINKS.telegramIvan)}
        >
          {CURRENT_YEAR} {t('copyright')} &copy;
        </button>
      </div>
    </footer>
  );
};
