'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initTranslations } from '../../app/i18n';
import { TranslationsProviderProps } from '@/types/props';

export const TranslationsProvider: React.FC<TranslationsProviderProps> = ({
  children,
  locale,
  namespaces,
  resources,
}) => {
  const i18n = createInstance();

  initTranslations({ locale, namespaces, i18nInstance: i18n, resources });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
