import {
  createRouter,
  createWebHistory,
  RouterView
} from "vue-router";
import i18n, {
  SUPPORTED_LOCALES,
  getDefaultLocale,
  loadLocaleMessages
} from "@/i18n";

import Items from "@/views/Items.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/:locale?",
    component: RouterView,
    beforeEnter(to, from, next) {
      const paramLocale = to.params.locale;

      if (
        !SUPPORTED_LOCALES.includes(paramLocale)
      ) {
        return next(getDefaultLocale());
      }

      loadLocaleMessages(
        i18n.global,
        paramLocale
      ).then(() => {
        if (
          i18n.global.locale.value !== paramLocale
        ) {
          i18n.global.locale.value = paramLocale;
          document
            .querySelector("html")
            .setAttribute("lang", paramLocale);
        }

        return next();
      });
    },
    children: [
      {
        path: "items",
        name: "Items",
        component: Items,
        alias: ""
      },
      {
        path: "about",
        name: "About",
        component: About
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
