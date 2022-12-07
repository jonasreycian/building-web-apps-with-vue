import { createI18n } from "vue-i18n";

const messages = {
  en: {
    routes: {
      items: "Items",
      about: "About us"
    },
    cart: {
      cart: "Cart",
      subtotal: "Subtotal",
      clearButton: "Remove this item"
    },
    popularItem:
      "The most popular item on the website is the {itm}, but not for long!"
  },
  hr: {
    routes: {
      items: "Artikli",
      about: "O nama"
    },
    cart: {
      cart: "Košarica",
      subtotal: "Ukupno",
      clearButton: "Ukloni ovaj artikl"
    },
    popularItem:
      "Najpopularniji artikl na stranici je {itm}, ali ne zadugo!"
  }
};

export default createI18n({
  locale: "en",
  legacy: false,
  fallbackLocale: "en",
  globalInjection: true,
  messages
});
