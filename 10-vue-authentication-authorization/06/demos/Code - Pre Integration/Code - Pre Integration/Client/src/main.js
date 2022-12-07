import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from '@/utils/toast.js';
import DKToast from 'vue-dk-toast';

const toastOptions = {
  duration: 1500,
  positionY: 'top', // 'top' or 'bottom'
  positionX: 'right', // 'right' or 'left'
  styles: {
    marginTop: '50px',
    padding: '30px'
  },
};

createApp(App)
  .use(router)
  .use(store)
  .use(DKToast, toastOptions)
  .use(Toast)
  .mount('#app');
