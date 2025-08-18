'use client';

import { FC } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { i18nConfig } from '@/i18nConfig';
import { LANGUAGES } from '@/constants';
import { LanguageChangerProps } from '@/types/props';

export const LanguageChanger: FC<LanguageChangerProps> = ({ onChangeEnd }) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = async (newLocale: string) => {
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }
    router.refresh();
    onChangeEnd?.();
  };

  return (
    <div className={`lg:text-dark-green font-bold`}>
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
