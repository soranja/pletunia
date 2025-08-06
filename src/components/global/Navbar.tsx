'use client';

import React from 'react';

// Components
import { LinkScroll } from './LinkScroll';

// Translation
import { useTranslation } from 'react-i18next';
import LanguageChanger from '../i18n/LanguageChanger';

import { CheckMobile } from '@/types';

export const Navbar: React.FC<CheckMobile> = ({ isMobile }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <nav className={`font-bold ${isMobile ? 'flex flex-col gap-y-6' : 'items flex grow'} `}>
        <ul
          className={`cursor-pointer text-base font-bold ${isMobile ? 'flex flex-col gap-y-4' : 'hidden grow items-center gap-x-6 lg:flex'}`}
        >
          <li>
            <LinkScroll to={'postcards'} offset={-50}>
              {t('navbar.postcards')}
            </LinkScroll>
            <div className="text-xxs mt-0.5 hidden pl-1.5">▼</div>
          </li>
          <li className="hidden">{'navbar.bracelets'}</li>
          <LinkScroll to={'order'} offset={-90}>
            <li>{t('buttons.orderButton')}</li>
          </LinkScroll>
          <LinkScroll to={'contacts'} offset={50}>
            <li>{t('navbar.contacts')}</li>
          </LinkScroll>
        </ul>
        <div className={`gap-x-2.5 text-white ${isMobile ? 'flex' : 'hidden lg:flex'} `}>
          <LanguageChanger isMobile={false} />
        </div>
      </nav>
    </>
  );
};

// language switcher closes drawer!
