'use client';

import { FC } from 'react';
import { Drawer } from './Drawer';
import { Navbar } from './Navbar';
import { LinkScroll } from './LinkScroll';
import { LanguageChanger } from '../i18n/LanguageChanger';

export const Header: FC = () => {
  return (
    <header className="bg-skintone sticky top-0 z-50 flex w-full items-center overflow-x-visible border-b-8 border-white p-4 font-sans text-black uppercase shadow-xl md:p-6 md:px-10">
      <div className="grow text-2xl font-extrabold text-black md:text-3xl">
        <LinkScroll to={'hero'} offset={-100}>
          <span>PLETUNIA</span>
        </LinkScroll>
      </div>

      {/* Desktop only */}
      <div className="hidden items-center gap-x-6 lg:flex">
        <Navbar orientation="row" />
        <LanguageChanger />
      </div>

      {/* Mobile only */}
      <div className="lg:hidden">
        <Drawer />
      </div>
    </header>
  );
};
