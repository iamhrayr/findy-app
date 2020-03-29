import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// locales
import en from './en';
import am from './am';

i18n.use(initReactI18next).init({
  resources: {
    en,
    am,
  },
  fallbackLng: 'en',
  debug: true,
  keySeparator: false, // we use content as keys
  ns: 'common',
  defaultNS: 'common',
  react: {
    wait: true,
  },
});

export default i18n;
