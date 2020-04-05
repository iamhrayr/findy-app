import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-react-native-language-detector';

// locales
import en from './en';
import am from './am';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      am,
    },
    debug: true,
    lng: 'en',
    keySeparator: false, // we use content as keys
    ns: 'common',
    defaultNS: 'common',
    react: {
      wait: true,
    },
  });

export default i18n;
