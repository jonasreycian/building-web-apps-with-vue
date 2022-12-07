import { OktaAuth } from '@okta/okta-auth-js';

let client;

export const routeGuard = async (to, from, next) => {  
  if (to.meta && to.meta.authorize) {
    let user;
    try {
      user = await client.token.getUserInfo();
    } catch (error) {
      user = null;
    }
    console.log(user);
    if (user?.Groups && user?.Groups.some(g => g === to.meta.authorize[0].name)) {
      next();
    } else if (user) {
      next('/unauthorized');
    } else {
      next({ path: '/login', query: { returnUrl: to.path } });
    }
  }
}

export const setupAuth = async options => {
  client = new OktaAuth({
    ...options,
  });

  try {
    // If the user is returning to the app after authentication

    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
      if (client.isLoginRedirect()) {
        // callback flow
        await client.handleLoginRedirect();
      }
    }
  } catch (e) {
    console.log(e);
  }

  return {
    install: app => {
      app.config.globalProperties.$auth = client;
    },
  };
};
