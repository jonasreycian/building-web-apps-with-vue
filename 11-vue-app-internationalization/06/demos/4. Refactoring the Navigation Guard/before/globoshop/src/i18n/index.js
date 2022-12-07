import { createI18n } from "vue-i18n";
import en from "./messages/en.json";
import numberFormats from "./numberFormats.js";
import datetimeFormats from "./datetimeFormats.js";
import pluralRules from "./pluralRules.js";
import { nextTick } from "vue";

const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "hr"];

const extractLanguage = locale => {
  return locale.split("-")[0];
};

function getDefaultLocale() {
  const persistedLocale = localStorage.getItem(
    "locale"
  );

  if (persistedLocale) {
    return persistedLocale;
  }

  const availableLocales = SUPPORTED_LOCALES;
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

export async function loadLocaleMessages(
  i18n,
  locale
) {
  if (!i18n.availableLocales.includes(locale)) {
    const messages = await import(
      /* webpackChunkName: "locale-[request]" */ `@/i18n/messages/${locale}.json`
    );
    i18n.setLocaleMessage(
      locale,
      messages.default
    );
  }

  return nextTick();
}

export default createI18n({
  locale: getDefaultLocale(),
  legacy: false,
  fallbackLocale: "en",
  globalInjection: true,
  messages: { en },
  numberFormats,
  datetimeFormats,
  pluralRules
});
