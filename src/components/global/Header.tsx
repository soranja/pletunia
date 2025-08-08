'use client';

import { FC } from 'react';

// Components
import { Drawer } from './Drawer';
import { Navbar } from './Navbar';
import { LinkScroll } from './LinkScroll';
import { LanguageChanger } from '../i18n/LanguageChanger';

import { CheckMobile } from '@/types';

export const Header: FC<CheckMobile> = ({ isMobile }) => {
  return (
    <header className="bg-layout-skintone sticky top-0 z-50 flex w-full items-center p-4 font-sans shadow-xl md:p-6 md:px-10">
      <div className="grow text-2xl font-extrabold">
        <LinkScroll to={'hero'} offset={0}>
          <span className="text-black md:text-3xl">PLETUNIA</span>
          <span className="text-layout-dark-green font-serif md:text-4xl">.</span>
        </LinkScroll>
      </div>
      <div className="flex gap-x-4">
        <Navbar isMobile={isMobile} />
        <LanguageChanger isMobile={isMobile} />
      </div>
      <Drawer isMobile={isMobile} />
    </header>
  );
};
