<template>
  <div class="signup p-5">
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
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex';
import { BIconEnvelopeOpenFill, BIconCalendar2Day, BIconPersonPlusFill } from 'bootstrap-icons-vue';

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
