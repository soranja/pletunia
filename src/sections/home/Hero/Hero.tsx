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
      className="bg-hero z-10 flex min-h-[90vh] items-stretch justify-between border-b-8 bg-cover px-10 pb-16"
      id="hero"
    >
      <div className="ml-10 flex flex-col justify-center gap-y-8">
        <h2 className="mb-5 max-w-3xl font-serif text-6xl leading-tight font-extrabold">
          {t('hero.slogan')}
        </h2>
        <div className="flex max-w-xl flex-col justify-center gap-y-10 text-2xl opacity-85">
          <span>{t('hero.aboutGoods')}</span>
          <span>{t('hero.aboutDelivery')}</span>
        </div>
        <LinkScroll to={'postcards'} offset={-50}>
          <button
            type="button"
            className="bg-layout-dark-green cursor-pointer self-start rounded-xl px-14 py-5 text-xl font-bold"
          >
            {t('hero.want')}
          </button>
        </LinkScroll>
      </div>
      <div className="relative w-1/2 self-stretch">
        <Image
          className="scale-125 object-contain object-bottom"
          src={HeroImages.ironGiant.imgUrl}
          alt="Iron Giant"
          fill
        />
        <Image className="hidden" src={HeroImages.lighthouse.imgUrl} fill alt="Lighthouse" />
      </div>
    </section>
  );
}
