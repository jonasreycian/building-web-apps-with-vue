<template>
  <div>
    <div class="signup p-5" v-if="!!user">
      <form @submit="signup" v-if="user" novalidate v-bind:class="formClass">
        <h2>Welcome {{ user.firstName }}</h2>
        <h2>Let's get you registered</h2>
        <p>We only need one more details from you!</p>
        <hr />
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <BIconEnvelopeOpenFill />
              </span>
            </div>
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email Address"
              readonly="readonly"
              v-model="user.email"
              required="required"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <BIconPersonPlusFill />
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              name="fullname"
              placeholder="Full name"
              required="required"
              v-model="user.name"
              readonly="readonly"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <BIconCalendar2Day />
              </span>
            </div>
            <input
              type="date"
              class="form-control"
              name="dateofbirth"
              placeholder="DD/MM/YYYY"
              required="required"
              v-model="user.DoB"
            />
            <div class="invalid-feedback">Please fill in your date of birth!</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-check-label">
            <input type="checkbox" required="required" v-model="termsAccepted" /> I accept the
            <a href="#">Terms of Use</a> &amp;
            <a href="#">Privacy Policy</a>
            <div class="invalid-feedback">You haven't accepted our terms and privacy policy!</div>
          </label>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-lg">Submit</button>
        </div>
      </form>
    </div>
    <div class="signup-buttons p-5" v-if="!user">
      <a href="#" class="google-signup" @click.prevent="loginWithGoogle">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 20 20" aria-hidden="true">
          <title>Google</title>
          <g fill="none" fill-rule="evenodd">
            <path
              fill="#4285F4"
              d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
            ></path>
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
            ></path>
            <path
              fill="#FBBC05"
              d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
            ></path>
            <path
              fill="#EA4335"
              d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
            ></path>
          </g>
        </svg>
        You need to sign in first!
      </a>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex';
import { BIconEnvelopeOpenFill, BIconCalendar2Day, BIconPersonPlusFill } from 'bootstrap-icons-vue';

async function checkForUser(store, email, access_token) {
  const existingUser = await store.dispatch({
    type: 'getUserByEmail',
    email,
    access_token
  });
  return existingUser?.data;
}

export default {
  data() {
    return {
      errors: [],
      formClass: '',
      termsAccepted: false
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    loginWithGoogle: async function () {
      try {
        const user = await this.$gAuth.signIn();
        // on success do something
        console.log('user', user);
        console.log('getId', user.getId());
        console.log('getBasicProfile', user.getBasicProfile());
        console.log('getAuthResponse', user.getAuthResponse());
        const userInfo = {
          name: user.Mt.Ed,
          firstName: user.Mt.qW,
          lastName: user.Mt.vU,
          email: user.Mt.tu,
          access_token: user.getAuthResponse().access_token,
        };

        const existingUser = await checkForUser(this.$store, userInfo.email, userInfo.access_token);

        if (!existingUser) {
          this.$infoToast(`Welcome ${userInfo.firstName}!`);
          userInfo.isNew = true;
        } else {
          this.$infoToast(`Welcome back ${userInfo.firstName}!`);
          userInfo.roles = existingUser.roles;
          const returnUrl = router?.currentRoute?.value?.query?.returnUrl;
          router.push(returnUrl ?? '/');
        }

        this.$store.commit('SET_USER', userInfo);
      } catch (error) {
        console.error(error);
        this.$errorToast('Login failed!');
      }
    },
    signup: async function (e) {
      e.preventDefault();
      if (!this.user.DoB) {
        this.errors.push('DoB');
        this.formClass = 'was-validated';
      }
      if (!this.termsAccepted) {
        this.errors.push('terms');
        this.formClass = 'was-validated';
      }

      this.$store
        .dispatch({
          type: 'updateUser',
          user: {...this.user},
          access_token: this.user.access_token,
        })
        .then(() => {
          this.$successToast("You're now registered!");
          const returnUrl = router?.currentRoute?.value?.query?.returnUrl;
          router.push(returnUrl ?? '/');
        });
    },
  },
  components: {
    BIconPersonPlusFill,
    BIconEnvelopeOpenFill,
    BIconCalendar2Day,
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