'use client';

import React from 'react';

// components
import Drawer from './Drawer';
import { Navbar } from './Navbar';

import { LinkScroll } from './LinkScroll';

export function Header() {
  return (
    <header className="bg-layout-skintone fixed z-20 flex w-full flex-row items-center justify-between p-4 font-sans shadow-xl md:p-6 md:px-10">
      <span className="grow text-2xl font-extrabold text-black md:text-3xl">
        <LinkScroll to={'hero'} offset={0}>
          PLETUNIA
          <span className="text-layout-dark-green pl-0.5 font-serif text-2xl md:text-4xl">.</span>
        </LinkScroll>
      </span>

      <Navbar isMobile={false} />
      <Drawer />
    </header>
  );
}
