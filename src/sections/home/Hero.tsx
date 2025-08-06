'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { LinkScroll } from '@/components/global/LinkScroll';
import HeroImages from '@/data/home/hero.json';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      className="hero bg-hero grid-cols-hero mt-0 grid h-screen bg-cover pr-5 pl-10 text-white md:px-20 md:pr-0 md:pl-10 lg:pl-40"
      id="hero"
    >
      <div
        className={`flex flex-col justify-center gap-y-6 md:mt-16 md:gap-y-10 md:pl-0 lg:gap-y-28`}
      >
        <h2
          className={`mt-5 mb-5 text-left font-serif text-3xl font-extrabold md:text-6xl lg:leading-tight`}
        >
          {t('hero.slogan')}
        </h2>
        <div className={`text-left lg:text-2xl`}>
          <p className="py-1 opacity-90 not-first:mb-4">{t('hero.aboutGoods')}</p>
          <p className="py-1 opacity-90">{t('hero.aboutDelivery')}</p>
        </div>
        <button className="bg-layout-dark-green self-start rounded-full p-5 px-10 text-xl font-bold tracking-wider">
          <LinkScroll to={'postcards'} offset={-50}>
            {t('hero.want')}
          </LinkScroll>
        </button>
      </div>
      <div className="relative h-[400px] w-full lg:w-1/2">
        <Image
          className="absolute -right-11 -bottom-10 rotate-7 rounded-3xl object-contain"
          src={HeroImages.ironGiant.imgUrl}
          alt="Iron Giant"
          fill
        />
      </div>
      <div className="mt-10 flex flex-col items-center justify-evenly overflow-hidden lg:hidden">
        <Image className="md:w-10/12" src={HeroImages.lighthouse.imgUrl} fill alt="Lighthouse" />
      </div>
    </section>
  );
}
