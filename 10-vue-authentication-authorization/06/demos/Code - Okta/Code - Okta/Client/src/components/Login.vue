<template>
  <div>
    <div class="signup-buttons p-5">
      <a href="#" class="google-signup" @click.prevent="login">
        <img src="okta.png" width="120" />
        You need to sign in first!
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      errors: [],
      formClass: '',
      termsAccepted: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    login: async function () {
      try {
        if (!(await this.$auth.isAuthenticated())) {
          console.log(this.$auth);
          await this.$auth.signInWithRedirect();
        }
      } catch (error) {
        console.error(error);
        this.$errorToast('Login failed!');
      }
    },
  },
};
</script>

<style scoped>
.google-signup {
  font-size: 2em;
  color: black;
  text-decoration: underline;
}

.signup {
  display: flex;
  justify-content: center;
}

.signup form {
  width: 500px;
}
</style>