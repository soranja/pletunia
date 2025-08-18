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
        className="bg-dark-green z-20 flex min-w-full flex-row p-10 text-white lg:items-center"
        id="contacts"
      >
        <span className="grow text-2xl font-extrabold text-white md:text-3xl">PLETUNIA</span>

        <ul className="flex flex-col items-end gap-y-4 lg:flex-row lg:gap-x-4">
          <li>
            <a
              href={SOCIAL_LINKS.telegramAlyona}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Telegram (Alyona) in a new tab"
              className="inline-flex"
            >
              <Image
                src={SOCIAL_ICONS.telegram.src}
                height={24}
                width={24}
                alt={SOCIAL_ICONS.telegram.alt}
              />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram in a new tab"
              className="inline-flex"
            >
              <Image
                src={SOCIAL_ICONS.insta.src}
                height={24}
                width={24}
                alt={SOCIAL_ICONS.insta.alt}
              />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_LINKS.whatsApp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open WhatsApp in a new tab"
              className="inline-flex"
            >
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

      <div className="bg-dark-green flex flex-col items-center" id="copyright">
        <hr className="w-[300px] border-b-0 border-black lg:w-[800px]" />
        <a
          href={SOCIAL_LINKS.telegramIvan}
          target="_blank"
          rel="noopener noreferrer"
          className="py-4 text-center text-sm text-white"
          aria-label="Open Telegram (Ivan) in a new tab"
        >
          {CURRENT_YEAR} {t('copyright')} &copy;
        </a>
      </div>
    </footer>
  );
};
