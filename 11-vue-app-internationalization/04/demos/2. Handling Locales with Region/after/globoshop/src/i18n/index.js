import { createI18n } from "vue-i18n";
import messages from "./messages.js";
import numberFormats from "./numberFormats.js";
import datetimeFormats from "./datetimeFormats.js";
import pluralRules from "./pluralRules.js";

const DEFAULT_LOCALE = "en";
const extractLanguage = locale => {
  return locale.split("-")[0];
};

function getDefaultLocale() {
  const availableLocales = Reflect.ownKeys(
    messages
  );
  const navigatorLocale = navigator.language;

  if (
    availableLocales.includes(navigatorLocale)
  ) {
    return navigatorLocale;
  }

  const navigatorLang = extractLanguage(
    navigatorLocale
  );

  //? supported locale: 'hr-HR'
  //? navigator.language: 'hr-BA'
  if (navigatorLocale.split("-").length > 1) {
    if (
      availableLocales.includes(navigatorLang)
    ) {
      return navigatorLang;
    }
  }

  const fallback = availableLocales.find(
    locale =>
      extractLanguage(locale) === navigatorLang
  );

  return fallback ? fallback : DEFAULT_LOCALE;
}

export default createI18n({
  locale: getDefaultLocale(),
  legacy: false,
  fallbackLocale: "en",
  globalInjection: true,
  messages,
  numberFormats,
  datetimeFormats,
  pluralRules
});
