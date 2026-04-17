import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common from "@/i18n/locales/en/common.json";
import landing from "@/i18n/locales/en/landing.json";
import aboutUs from "@/i18n/locales/en/aboutUs.json";
import contact from "@/i18n/locales/en/contact.json";
import support from "@/i18n/locales/en/support.json";
import privacyPolicy from "@/i18n/locales/en/privacyPolicy.json";
import notFound from "@/i18n/locales/en/notFound.json";
import profile from "@/i18n/locales/en/profile.json";
import auth from "@/i18n/locales/en/auth.json";
import dashboard from "@/i18n/locales/en/dashboard.json";
import lessons from "@/i18n/locales/en/lessons.json";
import sections from "@/i18n/locales/en/sections.json";
import flashcards from "@/i18n/locales/en/flashcards.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common,
        landing,
        aboutUs,
        contact,
        support,
        privacyPolicy,
        notFound,
        profile,
        auth,
        dashboard,
        lessons,
        sections,
        flashcards,
      },
    },
    lng: "en",
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common"],
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(console.error);

export default i18n;
