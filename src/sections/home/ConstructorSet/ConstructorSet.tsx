/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';

import CONSTRUCTOR_LAYERS from '@/data/home/constructor.json';
import { TConstructorLayer } from '@/types';

const LAYERS: TConstructorLayer[] = CONSTRUCTOR_LAYERS as TConstructorLayer[];

export const ConstructorSet: FC = () => {
  const { t } = useTranslation('sets');
  const [bgLayer, ...layers] = LAYERS;
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const viewRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(viewRef, {
    amount: 0.5,
    margin: '0px 0px -15% 0px',
  });

  const assembled = isTouch ? inView : hovered;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(hover: none)');
      const update = () => setIsTouch(mq.matches);
      update();
      mq.addEventListener?.('change', update);
      return () => mq.removeEventListener?.('change', update);
    }
  }, []);

  const FAST_SPRING = { type: 'spring' as const, stiffness: 280, damping: 24, mass: 0.6 };

  const SLOW_SPRING = {
    type: 'spring' as const,
    stiffness: 280 / 9,
    damping: 24 / 3,
    mass: 0.6,
    restDelta: 0.1,
    restSpeed: 10,
  };

  const CHAOS = useMemo(
    () =>
      layers.map((_, i) => {
        const angle = Math.floor(10 + Math.random() * 21);
        const dir = Math.random() < 0.5 ? -1 : 1;
        const depthFactor = i / (layers.length - 1);
        const deeperShift = 10 + depthFactor * 10;
        const deeperY = 60 + depthFactor * 10;
        return {
          angle,
          dir,
          restX: `${-deeperShift + Math.random() * 6}%`,
          restY: `-${deeperY}%`,
        };
      }),
    [layers]
  );

  return (
    <section
      id="constructor-set"
      className="bg-sea-sky relative z-10 flex w-full flex-col justify-between overflow-hidden border-b-8 bg-cover lg:flex-row"
    >
      {/* TEXT COLUMN — first on mobile, second on desktop */}
      <div className="z-10 order-1 mt-6 flex w-full flex-col justify-center gap-y-6 pb-8 md:mt-8 md:w-auto md:gap-y-8 md:px-16 md:pb-0 lg:order-2">
        <h2 className="bg-dark-blue mb-2 px-6 py-3 font-serif text-3xl font-extrabold uppercase md:mb-6 md:px-8 md:py-4 lg:text-5xl">
          {t('headline')}
        </h2>
        <div className="flex flex-col justify-center gap-y-1 bg-[#8fb7ba]/80 px-6 py-2 md:px-8 lg:bg-transparent">
          <span className="text-xl md:text-2xl">{t('description')}</span>
          <span className="italic opacity-70">{t('hint')}</span>
        </div>
      </div>

      {/* INTERACTIVE ANIMATION — second on mobile, first on desktop */}
      <div className="order-2 flex h-[60vh] w-full items-center justify-center md:h-screen lg:order-1 lg:h-auto lg:w-1/2 lg:justify-start">
        <motion.div
          ref={viewRef}
          className="relative flex h-full w-full items-center justify-end md:w-2/3 lg:w-1/2"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          {/* STACK AREA */}
          <div className="relative h-full w-full">
            {/* BG LAYER: hidden on mobile, visible on desktop */}
            <img
              src={bgLayer.path}
              alt={bgLayer.label}
              className="hidden h-full w-full object-cover lg:block"
            />

            {/* OTHER LAYERS ABSOLUTE */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
              {layers.map(({ layer, label, path }, i) => {
                const { angle, dir, restX, restY } = CHAOS[i];
                const idleRotate = angle * -dir;

                return (
                  <motion.img
                    key={layer}
                    src={path}
                    alt={label}
                    className="absolute drop-shadow-lg"
                    style={{ zIndex: layer, transformOrigin: '50% 100%' }}
                    initial={{
                      left: '50%',
                      x: '-50%',
                      top: '100%',
                      y: '-100%',
                      rotate: idleRotate,
                    }}
                    animate={
                      assembled
                        ? { left: '50%', x: '-50%', top: '50%', y: '-50%', rotate: 0 }
                        : { left: '50%', x: restX, top: '100%', y: restY, rotate: idleRotate }
                    }
                    transition={assembled ? FAST_SPRING : SLOW_SPRING}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
