<template>
  <div>
    <h3>Payment</h3>
    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <div><strong>Shipping Information</strong></div>
          <AddressView :address="model.shipping">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="Your Name"
                v-model="model.shipping.fullName.$model"
              />
            </div>
            <div class="form-group">
              <label for="company">Company Name</label>
              <input
                id="company"
                type="text"
                class="form-control"
                placeholder="Company"
                v-model="model.shipping.company.$model"
              />
            </div>
          </AddressView>
          <div class="form-group">
            <input type="submit" value="Next" class="btn btn-success" :disabled="model.$invalid" />
          </div>
        </div>
        <div class="col-md-6">
          <div><strong>Billing Information</strong></div>
          <AddressView
            :address="model.billing"
            :isDisabled="model.billing.sameAsShipping.$model"
          >
            <div class="form-check">
              <input
                type="checkbox"
                id="sameAsShipping"
                class="form-check-input"
                v-model="model.billing.sameAsShipping.$model"
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
              v-model="model.creditcard.number.$model"
              id="ccNumber"
            />
            <ValidationMessage :model="model.creditcard.number" />
          </div>
          <div class="form-group">
            <label for="nameOnCard">Name on Card</label>
            <input
              class="form-control"
              type="text"
              v-model="model.creditcard.nameOnCard.$model"
              id="nameOnCard"
            />
            <ValidationMessage :model="model.creditcard.nameOnCard" />
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="expirationMonth">Expiration Month</label>
              <select
                v-model="model.creditcard.expirationMonth.$model"
                class="form-control"
              >
                <option v-for="m in months" :key="m.number" :value="m.number">
                  {{ m.name }}
                </option>
              </select>
              <ValidationMessage :model="model.creditcard.expirationMonth" />
            </div>
            <div class="form-group col-md-4">
              <label for="expirationYear">Expiration Year</label>
              <select
                v-model="model.creditcard.expirationYear.$model"
                class="form-control"
              >
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
              <ValidationMessage :model="model.creditcard.expirationYear" />
            </div>
            <div class="form-group col-md-4">
              <label for="cvv">CVV Code</label>
              <input
                v-model="model.creditcard.cvv.$model"
                class="form-control"
                id="cvv"
              />
              <ValidationMessage :model="model.creditcard.cvv" />
            </div>
          </div>
          <!-- <div class="text-danger" v-if="model.creditcard.$invalid">
            <ul>
              <li v-for="e in model.creditcard.$errors" :key="e">{{ `${e.$property}: ${e.$message}` }}</li>
            </ul>
          </div> -->
        </div>
      </div>
    </form>
    <div>
      <pre>{{ payment }}</pre>
      <pre>{{ model }}</pre>
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
import ValidationMessage from "../components/ValidationMessage.vue";

export default {
  components: {
    AddressView,
    ValidationMessage,
  },
  emits: ["onError"],
  setup(props, { emit }) {
    const payment = reactive(state);

    async function onSave() {
      if (await model.value.$validate()) {
        state.errorMessage.value = "We can't save yet, we don't have an API";
      }
    }

    const zipcode = computed({
      get: () => payment.postalCode,
      set: (val) => {
        if (val && typeof val === "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            payment.postalCode = val;
          } else {
            payment.postalCode = `${val.substring(0, 5)}-${val.substring(5)}`;
          }
        }
      },
    });

    watch([payment.billing, payment.shipping],
      () => {
        if (payment.billing) {
          if (payment.billing.sameAsShipping) {
            payment.billing.setFrom(payment.shipping);
          }
        }
      }
    );

    const years = Array.from({ length: 10 }, (_, i) => i + 2020);

    const model = state.toModel();

    return {
      payment,
      model,
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
