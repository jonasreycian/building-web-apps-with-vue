<template>
  <div>
    <h3>Payment</h3>
    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <div><strong>Shipping Information</strong></div>
          <AddressView :address="payment.shipping">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="Your Name"
                v-model="payment.shipping.fullName"
              />
            </div>
            <div class="form-group">
              <label for="company">Company Name</label>
              <input
                id="company"
                type="text"
                class="form-control"
                placeholder="Company"
                v-model="payment.shipping.company"
              />
            </div>
          </AddressView>
          <div class="form-group">
            <input type="submit" value="Next" class="btn btn-success" />
          </div>
        </div>
        <div class="col-md-6">
          <div><strong>Billing Information</strong></div>
          <AddressView
            :address="payment.billing"
            :isDisabled="payment.billing.sameAsShipping"
          >
            <div class="form-check">
              <input
                type="checkbox"
                id="sameAsShipping"
                class="form-check-input"
                v-model="payment.billing.sameAsShipping"
              />
              <label for="sameAsShipping" class="form-check-label"
                >Same As Shipping?</label
              >
            </div>
          </AddressView>
          <div><strong>Credit Card</strong></div>
          <div class="form-group">
            <label for="ccNumber">Credit Card Number</label>
            <input
              class="form-control"
              type="text"
              v-model="payment.creditcard.number"
              id="ccNumber"
            />
          </div>
          <div class="form-group">
            <label for="nameOnCard">Name on Card</label>
            <input
              class="form-control"
              type="text"
              v-model="payment.creditcard.nameOnCard"
              id="nameOnCard"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="expirationMonth">Expiration Month</label>
              <select
                v-model="payment.creditcard.expirationMonth"
                class="form-control"
              >
                <option v-for="m in months" :key="m.number" :value="m.number">
                  {{ m.name }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="expirationYear">Expiration Year</label>
              <select
                v-model="payment.creditcard.expirationYear"
                class="form-control"
              >
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="cvv">CVV Code</label>
              <input
                v-model="payment.creditcard.cvv"
                class="form-control"
                id="cvv"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
    <div>
      <pre>{{ payment }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, reactive } from "vue";
import states from "@/lookup/states";
import formatters from "@/formatters";
import months from "@/lookup/months";
import AddressView from "./AddressView";
import state from "@/state";

export default {
  components: {
    AddressView,
  },
  emits: [
    "onError"
  ],
  setup(props, { emit }) {
    const payment = reactive(state);

    function onSave() {
      state.errorMessage.value = "We can't save yet, we don't have an API";
    }

    const zipcode = computed({
      get: () => payment.postalCode,
      set: (val) => {
        if (val && typeof val === "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            payment.postalCode = val;
          } else {
            payment.postalCode = `${val.substring(0, 5)}-${val.substring(
              5
            )}`;
          }
        }
      },
    });

    watch(
      // What to watch
      () => payment.billing.sameAsShipping,
      // What to do
      () => {
        if (payment.billing.sameAsShipping.value) {
          payment.clear();
        }
      }
    );

    const years = Array.from({ length: 10 }, (_, i) => i + 2020);

    return {
      payment,
      states,
      onSave,
      ...formatters,
      zipcode,
      months,
      years,
    };
  },
};
</script>
