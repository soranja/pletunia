import type { Metadata } from 'next';
import './global.css';

// Translation
import { initTranslations } from '../i18n';
import { dir } from 'i18next';
import { i18nConfig } from '@/i18nConfig';
import { i18nNamespaces } from '@/constants';

// Components
import { TranslationsProvider } from '@/components/i18n/TranslationsProvider';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';

export const metadata: Metadata = {
  title: 'Pletunia',
  description: 'Postcards, postcards constructors sets, and friendship bracelets from Yerevan',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>
) {
  const { children, params } = props;
  const { locale } = await params;

  const { t, resources } = await initTranslations({
    locale,
    namespaces: i18nNamespaces,
  });

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
          <Header isMobile={false} />
          {children}
          <Footer />
        </TranslationsProvider>
      </body>
    </html>
  );
}

// Wrapped my whole shop with TranslationsProvider here, not in the page! For my current scale it's okay.

/* @i18nexus:

  Yep, you can put the translation provider in the root layout instead of putting in each page component. But if you do this you will load into memory all namespaces for every page. This may be ok for smaller projects, but it's more efficient to load only the namespaces you need for each page.

  */
