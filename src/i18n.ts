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
  .use(Backend) // load translation using http -> /public/locales
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // init i18next in React, bind react-i18next to the instance
  .init({
    // returnNull: false,
    fallbackLng: "en",
    fallbackNS: "translation",
    ns: ["translation"],
    lng: defaultLanguage,
    debug: true, // log more information in the developer console
    detection: {
      order: ["queryString", "cookie"],
      caches: ["cookie"],
    },
  });

export default i18n;
