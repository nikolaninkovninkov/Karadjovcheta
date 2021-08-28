import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en/translation.json';
import bg from '../locales/bg/translation.json';
const Languages = ['en', 'bg'];
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'test',
    whitelist: Languages,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
      bg,
    },
  });
export default i18n;
