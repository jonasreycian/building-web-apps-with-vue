import { createI18n } from "vue-i18n";
import messages from "./messages.js";
import numberFormats from "./numberFormats.js";
import datetimeFormats from "./datetimeFormats.js";
import pluralRules from "./pluralRules.js";

export default createI18n({
  locale: "en",
  legacy: false,
  fallbackLocale: "en",
  globalInjection: true,
  messages,
  numberFormats,
  datetimeFormats,
  pluralRules
});
