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

const app = createApp(App)
  .use(router)
  .use(store)
  .use(DKToast, toastOptions)
  .use(Toast);

const msalOptions = {
  auth: {
    clientId: process.env.VUE_APP_CLIENTID,
    authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANTID}`,
    redirectUri: "http://localhost:8080/",
    postLogoutRedirectUri: 'https://localhost:8080/login'
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

setupAuth(msalOptions).then(auth => {
  app.use(auth).mount('#app');
});
