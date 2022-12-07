import {
  createRouter,
  createWebHistory,
  RouterView
} from "vue-router";

import Items from "@/views/Items.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/:locale?",
    component: RouterView,
    children: [
      {
        path: "/items",
        name: "Items",
        component: Items,
        alias: ""
      },
      {
        path: "/about",
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
