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
import { routeGuard } from '@/auth/auth-plugin';

export const routes = [
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
    component: Login,
  },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: routeGuard,
    meta: {
      authorize: {
        role: 'Admin',
      },
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
