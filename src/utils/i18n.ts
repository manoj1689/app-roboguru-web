import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../../public/locales/en.json"; // Import English translations
import hiTranslation from "../../public/locales/hi.json"; // Import Hindi translations

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    hi: { translation: hiTranslation },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
