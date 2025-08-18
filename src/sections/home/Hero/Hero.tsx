'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import HeroImages from '@/data/home/hero.json';
import { LinkScroll } from '@/components/global/LinkScroll';

export function Hero() {
  const { t } = useTranslation('hero');
  const viewRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(viewRef, {
    amount: 0.5,
    margin: '0px 0px -15% 0px',
  });

  return (
    <section
      id="hero"
      className="bg-hero z-10 flex flex-col items-stretch justify-between border-b-8 bg-cover pt-8 md:flex-row md:px-10 md:pb-16"
    >
      {/* Left / Top Part: Text */}
      <div className="ml-0 flex flex-col justify-center gap-y-6 md:ml-10 md:gap-y-8 lg:min-h-screen">
        <h2 className="bg-dark-green mb-4 px-6 py-4 font-serif text-2xl leading-tight font-extrabold uppercase md:mb-5 md:px-8 md:py-4 md:text-5xl lg:max-w-2xl">
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
      <div
        ref={viewRef}
        className="relative h-[48vh] w-full self-end overflow-visible md:h-auto md:w-1/2 md:self-stretch"
      >
        {/* Desktop: Iron Giant */}
        <motion.div
          initial={{ y: 400 }}
          animate={inView ? { y: 0 } : { y: 400 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="relative hidden h-full w-full will-change-transform md:block"
          style={{ transformOrigin: 'bottom center' }}
        >
          <Image
            className="scale-125 object-contain object-bottom"
            src={HeroImages.ironGiant.imgUrl}
            alt="Iron Giant"
            fill
            priority
          />
        </motion.div>

        {/* Mobile: Green Girl */}
        <motion.div
          ref={viewRef}
          initial={{ rotate: 180, x: 100, y: 100 }}
          animate={inView ? { rotate: 4, x: 20, y: 0 } : { rotate: 180, x: 100, y: 100 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="relative h-full w-full md:hidden"
          style={{ transformOrigin: 'bottom center' }}
        >
          <Image
            src={HeroImages.greenGirl.imgUrl}
            alt="Green Girl"
            fill
            priority
            className="pointer-events-none translate-x-6 translate-y-4 scale-[1.15] object-contain object-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
}
