'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { i18nConfig } from '@/i18nConfig';

export default function LanguageChanger() {
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
    <div className="text-white font-bold">
      <button
        className={`
        rounded-full p-2 px-5 tracking-wider bg-layout-blue-gray 
        ${currentLocale === 'en' ? 'hidden' : ''}
        `}
        onClick={() => handleChange('en')}
        disabled={currentLocale === 'en'}
      >
        EN
      </button>
      <button
        className={`
        rounded-full p-2 px-5 tracking-wider bg-layout-blue-gray 
        ${currentLocale === 'ru' ? 'hidden' : ''}
        `}
        onClick={() => handleChange('ru')}
        disabled={currentLocale === 'ru'}
      >
        RU
      </button>
    </div>
  );
}
