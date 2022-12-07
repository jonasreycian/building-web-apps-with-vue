import { PublicClientApplication } from '@azure/msal-browser';
import Emitter from 'tiny-emitter';

let client;

export const setupAuth = async options => {
  client = new PublicClientApplication({
    ...options,
  });

  return {
    install: app => {
      app.config.globalProperties.$msalInstance = client;
      app.config.globalProperties.$emitter = new Emitter();
    },
  };
};