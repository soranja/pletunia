'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import HeroImages from '@/data/home/hero.json';
import { LinkScroll } from '@/components/global/LinkScroll';

export function Hero() {
  const { t } = useTranslation('hero');

  return (
    <section
      id="hero"
      className="bg-hero z-10 flex flex-col items-stretch justify-between border-b-8 bg-cover pt-8 md:flex-row md:px-10 md:pb-16"
    >
      {/* Left / Top Part: Text */}
      <div className="ml-0 flex flex-col justify-center gap-y-6 md:ml-10 md:gap-y-8 lg:min-h-screen">
        <h2 className="bg-dark-green mb-4 max-w-2xl px-6 py-4 font-serif text-2xl leading-tight font-extrabold md:mb-5 md:px-8 md:py-4 md:text-5xl">
          {t('slogan')}
        </h2>

        <div className="flex max-w-xl flex-col justify-center gap-y-6 px-6 text-xl md:gap-y-10 md:text-2xl">
          <span>{t('aboutGoods')}</span>
          <span>{t('aboutDelivery')}</span>

          <LinkScroll to="postcards" offset={-95}>
            <button
              type="button"
              className="bg-dark-green cursor-pointer self-start px-8 py-4 text-lg font-bold md:px-14 md:py-5 md:text-xl"
            >
              {t('wantButton')}
            </button>
          </LinkScroll>
        </div>
      </div>

      {/* Right / Bottom Part: Images */}
      <div className="relative h-[48vh] w-full self-end overflow-visible md:h-auto md:w-1/2 md:self-stretch">
        {/* Desktop: Iron Giant */}
        <Image
          className="hidden scale-125 object-contain object-bottom md:block"
          src={HeroImages.ironGiant.imgUrl}
          alt="Iron Giant"
          fill
        />

        {/* Mobile: Lighthouse (oversized, bottom-anchored, slight clockwise rotation) */}
        <Image
          className="xs:scale-[1.35] pointer-events-none block origin-bottom translate-y-2 scale-[1.25] rotate-[6deg] object-contain object-bottom sm:scale-[1.5] md:hidden"
          src={HeroImages.lighthouse.imgUrl}
          alt="Lighthouse"
          fill
          priority
        />
      </div>
    </section>
  );
}
