'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { LinkScroll } from './LinkScroll';
import { TMobile } from '@/types';

export const Navbar: FC<TMobile> = ({ isMobile }) => {
  const { t } = useTranslation('common');

  return (
    <nav className={`flex font-bold ${isMobile ? 'flex-col gap-y-6' : ''} `}>
      <ul
        className={`cursor-pointer text-base font-bold ${isMobile ? 'flex flex-col gap-y-4' : 'hidden grow items-center gap-x-6 lg:flex'}`}
      >
        <li>
          <LinkScroll to={'postcards'} offset={-95}>
            {t('navbar.postcards')}
          </LinkScroll>
        </li>
        <LinkScroll to={'order'} offset={-95}>
          <li>{t('buttons.orderButton')}</li>
        </LinkScroll>
        <LinkScroll to={'contacts'} offset={0}>
          <li>{t('navbar.contacts')}</li>
        </LinkScroll>
      </ul>
    </nav>
  );
};

// language switcher closes drawer!
