import { createI18n } from "vue-i18n";

const messages = {
  en: {
    routes: {
      items: "Items",
      about: "About us"
    }
  },
  hr: {
    routes: {
      items: "Artikli",
      about: "O nama"
    }
  }
};

export default createI18n({
  locale: "en",
  legacy: false,
  fallbackLocale: "en",
  messages
});
