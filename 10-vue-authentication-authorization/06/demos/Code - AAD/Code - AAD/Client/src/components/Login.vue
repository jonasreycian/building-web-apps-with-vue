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
            <input type="checkbox" required="required" v-model="termsAccepted" /> I accept the <a href="#">Terms of Use</a> &amp;
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
      <a href="#" class="google-signup" @click.prevent="login">
        <img src="@/assets/AAD.png" alt="Microsoft Azure Active Directory" width="48" />
        You need to sign in first!
      </a>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { BIconEnvelopeOpenFill, BIconCalendar2Day, BIconPersonPlusFill } from 'bootstrap-icons-vue';

async function checkForUser(store, email, access_token) {
  const existingUser = await store.dispatch({
    type: 'getUserByEmail',
    email,
    access_token,
  });
  return existingUser?.data;
}

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
    login: async function() {
      try {
        await this.$msalInstance
          .loginPopup({
            prompt: 'select_account'
          })
          .then(() => {
            const myAccounts = this.$msalInstance.getAllAccounts();
            const loggedInAcc = myAccounts.find(u => u.username.includes('adel.mehrban'));
            this.$emitter.emit('login', this.account);
            console.log(loggedInAcc);
            const userInfo = {
              name: loggedInAcc.name,
              firstName: loggedInAcc.idTokenClaims['given_name'],
              lastName: loggedInAcc.idTokenClaims['family_name'],
              email: loggedInAcc.username,
              access_token: 'at',
            };

            const currentAccount = this.$msalInstance.getAccountByUsername(loggedInAcc.username);
            const accessTokenRequest = {
              scopes: ['api://users/crud', 'profile', 'openid'],
              account: currentAccount,
              forceRefresh: false
            };

            this.$msalInstance
              .acquireTokenSilent(accessTokenRequest)
              .then(accessTokenResponse => {
                userInfo.access_token = accessTokenResponse.accessToken;
                console.log(accessTokenResponse);
              })
              .catch(error => {
                if (error instanceof InteractionRequiredAuthError) {
                  // fallback to interaction when silent call fails
                  this.$msalInstance.acquireTokenPopup(accessTokenRequest).then(response => {
                    userInfo.access_token = response.accessToken;
                    console.log(userInfo);
                  });
                }
              })
              .catch(error => console.log(error))
              .finally(async () => {
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
              });




          })
          .catch(error => {
            console.error(`error during authentication: ${error}`);
          });
      } catch (error) {
        console.error(error);
        this.$errorToast('Login failed!');
      }
    },
    signup: async function(e) {
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
          user: { ...this.user },
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
