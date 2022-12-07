import { createI18n } from "vue-i18n";
import messages from "./messages.js";
import numberFormats from "./numberFormats.js";
import datetimeFormats from "./datetimeFormats.js";
import pluralRules from "./pluralRules.js";

const DEFAULT_LOCALE = "hr";

function getDefaultLocale() {
  const availableLocales = Reflect.ownKeys(messages);
  const navigatorLocale = navigator.language;

  if (availableLocales.includes(navigatorLocale)) {
    return navigatorLocale;
  }

  return DEFAULT_LOCALE;
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
