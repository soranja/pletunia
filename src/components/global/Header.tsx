'use client';

import { FC } from 'react';

// Components
import { Drawer } from './Drawer';
import { Navbar } from './Navbar';
import { LinkScroll } from './LinkScroll';
import { LanguageChanger } from '../i18n/LanguageChanger';

import { TMobile } from '@/types';

export const Header: FC<TMobile> = ({ isMobile }) => {
  return (
    <header className="bg-layout-skintone sticky top-0 z-50 flex w-full items-center overflow-x-visible border-b-8 border-white p-4 font-sans text-black uppercase shadow-xl md:p-6 md:px-10">
      <div className="grow text-2xl font-extrabold">
        <LinkScroll to={'hero'} offset={-100}>
          <span className="text-black md:text-3xl">PLETUNIA</span>
          <span className="text-layout-dark-green font-serif md:text-4xl">.</span>
        </LinkScroll>
      </div>
      <div className="flex gap-x-6">
        <Navbar isMobile={isMobile} />
        <LanguageChanger isMobile={isMobile} />
      </div>
      <Drawer isMobile={isMobile} />
    </header>
  );
};
