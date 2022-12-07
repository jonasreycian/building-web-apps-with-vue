import {
  createRouter,
  createWebHistory,
  RouterView
} from "vue-router";
import i18n from "@/i18n";

import Items from "@/views/Items.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/:locale?",
    component: RouterView,
    beforeEnter(to, from, next) {
      const paramLocale = to.params.locale;

      if (
        !i18n.global.availableLocales.includes(
          paramLocale
        )
      ) {
        return next(i18n.global.locale.value);
      }

      if (
        i18n.global.locale.value !== paramLocale
      ) {
        i18n.global.locale.value = paramLocale;
      }

      return next();
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
