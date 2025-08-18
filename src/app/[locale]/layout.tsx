import './global.css';
import { dir } from 'i18next';

import { I18N_NAMESPACES } from '@/constants';
import { initTranslations } from '../i18n';
import { TranslationsProvider } from '@/components/i18n/TranslationsProvider';

import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { LocaleParamsProps } from '@/types/props';

export { generateMetadata } from '@/lib/metadata';
export { generateStaticParams } from '@/lib/next';

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: LocaleParamsProps;
}) {
  const { children, params } = props;
  const { locale } = await params;

  const { resources } = await initTranslations({
    locale,
    namespaces: I18N_NAMESPACES,
  });

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <TranslationsProvider resources={resources} locale={locale} namespaces={I18N_NAMESPACES}>
          <Header />
          {children}
          <Footer />
        </TranslationsProvider>
      </body>
    </html>
  );
}
