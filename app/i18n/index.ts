import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-react-native-language-detector';

import locale from 'react-native-locale-detector';

// We could log it. Maybe it's en-US...
console.log({ locale });

// locales
import en from './en';
import am from './am';
// import ru from './ru';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      // ru,
      am,
    },
    // fallbackLng: 'en',
    debug: true,
    lng: 'am',
    keySeparator: false, // we use content as keys
    ns: 'common',
    defaultNS: 'common',
    react: {
      wait: true,
    },
  });

export default i18n;
