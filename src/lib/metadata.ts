import type { Metadata } from 'next';
import { METADATA } from '@/constants';
import { ogLocale, localizedPath } from './i18n';
import { LocaleParamsProps } from '@/types/props';

export async function generateMetadata({
  params,
}: {
  params: LocaleParamsProps;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = localizedPath(locale);

  return {
    ...METADATA,
    title: METADATA.title,
    openGraph: {
      ...METADATA.openGraph,
      url: path,
      locale: ogLocale(locale),
    },
    alternates: {
      ...METADATA.alternates,
      canonical: path,
    },
  };
}
