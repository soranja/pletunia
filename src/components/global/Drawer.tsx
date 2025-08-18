'use client';

import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageChanger } from '../i18n/LanguageChanger';
import { Navbar } from './Navbar';

export const Drawer: FC = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const open = () => setIsOpen(true);

  return (
    <>
      {/* Burger */}
      <button
        className="text-dark-green flex items-center"
        onClick={open}
        aria-label="Open menu"
        aria-controls="mobile-drawer"
      >
        <svg className="block h-6 w-6 fill-current" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      {/* Dark Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[5px]"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        className={`bg-dark-green fixed top-0 right-0 z-50 h-full w-3/4 transform text-white shadow-2xl transition-transform duration-200 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col justify-between p-10">
          <div className="flex flex-col gap-y-4">
            <Navbar orientation="col" onItemClick={close} />
            <LanguageChanger onChangeEnd={close} />
          </div>

          <button
            className="w-full border border-white/40 px-4 py-3 font-bold tracking-wide uppercase hover:bg-white/10 active:scale-[0.99]"
            onClick={close}
          >
            {t('buttons.close')}
          </button>
        </div>
      </aside>
    </>
  );
};
