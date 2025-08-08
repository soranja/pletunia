'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { i18nConfig } from '@/i18nConfig';

import { LANGUAGES } from '@/constants';
import { CheckMobile } from '@/types';

export const LanguageChanger: FC<CheckMobile> = ({ isMobile }) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <div className="cursor-pointer font-bold text-white">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`cursor-pointer p-2 px-5 text-black ${currentLocale === lang ? 'hidden' : ''} `}
          onClick={() => handleChange(lang)}
          disabled={currentLocale === lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
