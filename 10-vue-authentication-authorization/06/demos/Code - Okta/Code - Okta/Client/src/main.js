import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from '@/utils/toast.js';
import DKToast from 'vue-dk-toast';
import { setupAuth } from '@/auth';

const toastOptions = {
  duration: 1500,
  positionY: 'top', // 'top' or 'bottom'
  positionX: 'right', // 'right' or 'left'
  styles: {
    marginTop: '50px',
    padding: '30px',
  },
};

const oktaOptions = {
  issuer: `https://${process.env.VUE_APP_OKTADOMAIN}/oauth2/default`,
  clientId: process.env.VUE_APP_CLIENTID,
  redirectUri: window.location.origin + '/callback',
  scopes: ['openid', 'profile', 'email', 'groups'],
  restoreOriginalUri: async () => {
    // redirect with custom router
    router.replace({
      path: '/',
    });
  },
};

const app = createApp(App)
  .use(router)
  .use(store)
  .use(DKToast, toastOptions)
  .use(Toast);

setupAuth(oktaOptions).then(auth => {
  app.use(auth).mount('#app');
});
