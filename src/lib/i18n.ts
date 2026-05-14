import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "../../public/locales/es/common.json";
import en from "../../public/locales/en/common.json";

/** SSR and first client paint must match — read localStorage in I18nProvider after mount. */
export const DEFAULT_I18N_LANG = "es";

i18n.use(initReactI18next).init({
  resources: {
    es: { common: es },
    en: { common: en },
  },
  lng: DEFAULT_I18N_LANG,
  fallbackLng: "es",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
