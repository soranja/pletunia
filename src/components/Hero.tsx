/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';

import { useTranslation } from 'react-i18next';
import LinkScroll from './LinkScroll';

function Hero() {
  const { t } = useTranslation();

  return (
    <section
      className="hero
      bg-hero bg-cover h-screen grid pl-10 pr-5 grid-cols-hero text-white mt-0
      md:px-20 md:pl-10 md:pr-0 
      lg:pl-40"
      id="hero"
    >
      <div
        className={`
        gap-y-6 flex flex-col justify-center
        md:gap-y-10 md:mt-16 md:pl-0
        lg:gap-y-28`}
      >
        <h2
          className={`font-serif font-extrabold text-3xl mt-5 mb-5 text-left 
          md:text-6xl 
          lg:leading-tight
          
          `}
        >
          {t('hero.slogan')}
        </h2>
        <div
          className={`text-left 
          lg:text-2xl 
          `}
        >
          <p className="py-1 opacity-90 not-first:mb-4">{t('hero.aboutGoods')}</p>
          <p className="py-1 opacity-90">{t('hero.aboutDelivery')}</p>
        </div>
        <button className="rounded-full p-5 px-10 tracking-wider bg-layout-dark-green font-bold text-xl self-start">
          <LinkScroll to={'postcards'} offset={-50}>
            {t('hero.want')}
          </LinkScroll>
        </button>
      </div>
      <div
        className="hidden justify-end items-end overflow-hidden relative
        lg:flex"
      >
        <img
          className="w-full rounded-3xl rotate-7 absolute -bottom-10 -right-11"
          src="/images/pages/iron-giant-hero.jpg"
          alt="hero postcard"
        />
      </div>
      <div className="flex flex-col mt-10 justify-evenly items-center overflow-hidden lg:hidden">
        <img className="md:w-10/12" src="/images/pages/lighthouse.png" alt="charm" />
      </div>
    </section>
  );
}

export default Hero;
