import type { Metadata } from "next";
import "./globals.css";

// translation
import initTranslations from "../i18n";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";

// components
import TranslationsProvider from "@/components/i18n/TranslationsProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pletunia",
  description:
    "Postcards, postcards constructors sets, and friendship bracelets from Yerevan",
};

const i18nNamespaces = ["home", "common", "news", "order"];

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  // Wrapped my whole shop with TranslationsProvider here, not in the page! For my current scale it's okay.

  /* @i18nexus:

  Yep, you can put the translation provider in the root layout instead of putting in each page component. But if you do this you will load into memory all namespaces for every page. This may be ok for smaller projects, but it's more efficient to load only the namespaces you need for each page.

  */

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <TranslationsProvider
          resources={resources}
          locale={locale}
          namespaces={i18nNamespaces}
        >
          <Header></Header>
          {children}
          <Footer></Footer>
        </TranslationsProvider>
      </body>
    </html>
  );
}
