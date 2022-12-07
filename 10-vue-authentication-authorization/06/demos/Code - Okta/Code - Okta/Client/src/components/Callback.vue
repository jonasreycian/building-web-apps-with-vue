<template>
  <div>Processing token</div>
</template>

<script>
import router from '@/router';

async function checkForUser(store, email, access_token) {
  const existingUser = await store.dispatch({
    type: 'getUserByEmail',
    email,
    access_token,
  });
  return existingUser?.data;
}

export default {
  async mounted() {
    if (await this.$auth.isAuthenticated()) {
      const token = await this.$auth.tokenManager.get('accessToken');
      const user = await this.$auth.token.getUserInfo();
      const userInfo = {
        name: user.name,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
        access_token: token.accessToken,
        isNew: false,
        roles: [],
      };

      const existingUser = await checkForUser(this.$store, userInfo.email, userInfo.access_token);

      if (!existingUser) {
        this.$infoToast(`Welcome ${userInfo.firstName}!`);
        userInfo.isNew = true;
        router.push('/signup');
      } else {
        this.$infoToast(`Welcome back ${userInfo.firstName}!`);
        userInfo.roles = existingUser.roles;
        const returnUrl = router?.currentRoute?.value?.query?.returnUrl;
        router.push(returnUrl ?? '/');
      }

      this.$store.commit('SET_USER', userInfo);
    }
  },
};
</script>