import i18n from "i18next";
import Backend, { HttpBackendOptions } from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const defaultLanguage = window.navigator.language;

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    returnNull: false,
    fallbackLng: "en",
    lng: defaultLanguage,
    debug: true,
    detection: {
      order: ["queryString", "cookie"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
