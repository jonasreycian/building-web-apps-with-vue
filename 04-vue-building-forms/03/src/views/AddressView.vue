<template>
  <div class="border rounded p-2">
    <slot />
    <div class="form-group">
      <label for="address1">Address</label>
      <input
        id="address1"
        type="text"
        class="form-control"
        placeholder="Street Address"
        v-model="address.address1"
        :disabled="isDisabled"
      />
    </div>
    <div class="form-group">
      <label for="address2">Suite/Apartment #</label>
      <input
        id="address2"
        type="text"
        class="form-control"
        placeholder=""
        v-model="address.address2"
        :disabled="isDisabled"
      />
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="cityTown">City</label>
        <input
          id="cityTown"
          type="text"
          class="form-control"
          placeholder="e.g. New York"
          v-model="address.cityTown"
          :disabled="isDisabled"
        />
      </div>
      <div class="form-group col-md-3">
        <label for="stateProvince">State</label>
        <select
          id="stateProvince"
          class="form-control"
          v-model="address.stateProvince"
          :disabled="isDisabled"
        >
          <option
            v-for="s in states"
            :key="s.abbreviation"
            :value="s.abbreviation"
          >
            {{ stateFormat(s) }}
          </option>
        </select>
      </div>
      <div class="form-group col-md-3">
        <label for="postalCode">Zipcode</label>
        <input
          id="postalCode"
          type="text"
          class="form-control"
          placeholder="e.g. 10101"
          v-model="address.postalCode"
          :disabled="isDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import states from "@/lookup/states";
import formatters from "@/formatters";

export default {
  props: {
    address: {
      type: Object,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  setup() {
    return {
      states,
      ...formatters,
    };
  },
};
</script>