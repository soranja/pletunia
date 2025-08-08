'use client';

import { FC } from 'react';

// Components
import { LinkScroll } from './LinkScroll';

// Translation
import { useTranslation } from 'react-i18next';

import { CheckMobile } from '@/types';

export const Navbar: FC<CheckMobile> = ({ isMobile }) => {
  const { t } = useTranslation('common');

  return (
    <nav className={`flex font-bold ${isMobile ? 'flex-col gap-y-6' : ''} `}>
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
    </nav>
  );
};

// language switcher closes drawer!
