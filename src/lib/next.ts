import { i18nConfig } from '@/i18nConfig';

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
