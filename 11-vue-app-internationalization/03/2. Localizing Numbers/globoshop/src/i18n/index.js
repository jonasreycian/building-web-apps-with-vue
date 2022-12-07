import { createI18n } from "vue-i18n";

const numberFormats = {
  en: {
    currencyFormat: {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol"
    }
  },
  hr: {
    currencyFormat: {
      style: "currency",
      currency: "HRK"
    }
  }
};

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
    aboutUs: {
      firstParagraph:
        "Learn more @.lower:routes.about{'.'}",
      secondParagraph:
        "We are a small company with big dreams. Our goal is to provide items to all of the people in the world. Stay tuned, because your country might be our next destination!",
      popularItem:
        "The most popular item on the website is the {itm}, but not for long!"
    }
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
    aboutUs: {
      firstParagraph:
        "Nauči više @.lower:routes.about{'.'}",
      secondParagraph:
        "Mi smo mala tvrtka s velikim snovima. Naš cilj je omogućiti pristup artiklima za sve ljude na svijetu. Pratite nas, jer možda baš vaša zemlja postane naša sljedeća destinacija!",
      popularItem:
        "Najpopularniji artikl na stranici je {itm}, ali ne zadugo!"
    }
  }
};

export default createI18n({
  locale: "en",
  legacy: false,
  fallbackLocale: "en",
  globalInjection: true,
  messages,
  numberFormats
});
