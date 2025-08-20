import type { Metadata } from 'next';
import { METADATA_BASE } from '@/constants';
import { localizedPath, ogLocale } from './i18n';
import { LocaleParamsProps } from '@/types/props';

const DESCRIPTIONS = {
  en: 'Postcards and postcard constructor sets from Yerevan',
  ru: 'Открытки и наборы‑конструкторы открыток из Еревана',
} as const;

export async function generateMetadata({
  params,
}: {
  params: LocaleParamsProps;
}): Promise<Metadata> {
  const { locale } = await params;
  const desc = DESCRIPTIONS[locale as 'en' | 'ru'] ?? DESCRIPTIONS.en;
  const path = localizedPath(locale);

  return {
    ...METADATA_BASE,
    description: desc,
    openGraph: {
      ...METADATA_BASE.openGraph!,
      url: path,
      description: desc,
      locale: ogLocale(locale),
      alternateLocale: ['en_US', 'ru_RU'],
    },
    twitter: {
      ...METADATA_BASE.twitter!,
      description: desc,
    },
    alternates: {
      canonical: path,
      languages: { en: '/en', ru: '/ru' },
    },
  };
}
