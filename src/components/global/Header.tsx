'use client';

import React from 'react';

// components
import Drawer from './Drawer';
import { Navbar } from './Navbar';

import { LinkScroll } from './LinkScroll';

export function Header() {
  return (
    <header
      className="fixed
    flex flex-row justify-between items-center 
    w-full p-4 bg-layout-skintone font-sans shadow-xl z-20
    md:p-6 md:px-10 
    "
    >
      <span
        className="font-extrabold text-black grow
        text-2xl 
        md:text-3xl"
      >
        <LinkScroll to={'hero'} offset={0}>
          PLETUNIA
          <span className=" text-layout-dark-green font-serif text-2xl md:text-4xl pl-0.5">.</span>
        </LinkScroll>
      </span>

      <Navbar isMobile={false} />
      <Drawer />
    </header>
  );
}
