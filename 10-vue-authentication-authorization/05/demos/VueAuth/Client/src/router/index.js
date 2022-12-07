import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home';
import MovieDetails from '@/components/MovieDetails';
import About from '@/components/About';
import Booking from '@/components/Booking';
import Food from '@/components/Food';
import Accessibility from '@/components/Accessibility';
import Login from '@/components/Login';
import Admin from '@/components/Admin';
import UnAuthorized from '@/components/403';
import Roles from './roles';

function guardMyroute(to, from, next) {
  const vuexStore = JSON.parse(localStorage.getItem('vuex'));
  if (to.meta && to.meta.authorize) {
    if (vuexStore?.userInfo?.roles && vuexStore?.userInfo?.roles[0].name === to.meta.authorize[0].name) {
      next();
    } else if (vuexStore.userInfo) {
      next('/unauthorized');
    } else {
      next({ path: '/login', query: { returnUrl: to.path } });
    }
  }
}

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/movie/:id',
    component: MovieDetails,
  },
  {
    path: '/book/:movieId',
    component: Booking,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/food',
    component: Food,
  },
  {
    path: '/a11y',
    component: Accessibility,
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    beforeEnter: guardMyroute,
    component: Admin,
    meta: {
      authorize: [Roles[0]],
    },
  },
  {
    path: '/unauthorized',
    component: UnAuthorized,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
