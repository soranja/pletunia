'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkScroll } from './LinkScroll';

import { NavbarProps } from '@/types/props';

export const Navbar: FC<NavbarProps> = ({ orientation = 'row', onItemClick }) => {
  const { t } = useTranslation('common');
  const isCol = orientation === 'col';

  return (
    <nav className="text-base font-bold">
      <ul className={isCol ? 'flex flex-col gap-y-4' : 'flex items-center gap-x-6'}>
        <li>
          <LinkScroll to="constructor-set" offset={-120} onAfterClick={onItemClick}>
            {t('navbar.constructor')}
          </LinkScroll>
        </li>
        <li>
          <LinkScroll to="postcards" offset={-95} onAfterClick={onItemClick}>
            {t('navbar.postcards')}
          </LinkScroll>
        </li>
        <li>
          <LinkScroll to="order" offset={-95} onAfterClick={onItemClick}>
            {t('navbar.order')}
          </LinkScroll>
        </li>
        <li>
          <LinkScroll to="contacts" offset={0} onAfterClick={onItemClick}>
            {t('navbar.contacts')}
          </LinkScroll>
        </li>
      </ul>
    </nav>
  );
};
