import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import arTranslation from './locale/ar.json';
import frTranslation from './locale/fr.json';

const resources = {
    ar: {
        translation: arTranslation
    },
    fr: {
        translation: frTranslation
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "ar",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;