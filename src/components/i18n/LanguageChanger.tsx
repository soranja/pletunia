'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { i18nConfig } from '@/i18nConfig';

import { LANGUAGES } from '@/constants';
import { TMobile } from '@/types';

export const LanguageChanger: FC<TMobile> = ({ isMobile }) => {
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
    <div className="cursor-pointer font-bold">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`cursor-pointer uppercase ${currentLocale === lang ? 'hidden' : ''} `}
          onClick={() => handleChange(lang)}
          disabled={currentLocale === lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
