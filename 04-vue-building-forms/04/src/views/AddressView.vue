<template>
  <div class="border rounded p-2">
    <slot />
    <div class="form-group">
      <label for="address1">Address</label>
      <input
        name="address1"
        type="text"
        class="form-control"
        placeholder="Street Address"
        v-model="address.address1.$model"
        :disabled="isDisabled"
      />
      <ValidationMessage :model="address.address1" />
    </div>
    <div class="form-group">
      <label for="address2">Suite/Apartment #</label>
      <input
        name="address2"
        type="text"
        class="form-control"
        placeholder=""
        v-model="address.address2.$model"
        :disabled="isDisabled"
      />
      <ValidationMessage :model="address.address2" />
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="cityTown">City</label>
        <input
          name="cityTown"
          type="text"
          class="form-control"
          placeholder="e.g. New York"
          v-model="address.cityTown.$model"
          :disabled="isDisabled"
        />
        <ValidationMessage :model="address.cityTown" />
      </div>
      <div class="form-group col-md-3">
        <label for="stateProvince">State</label>
        <select
          name="stateProvince"
          class="form-control"
          v-model="address.stateProvince.$model"
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
        <ValidationMessage :model="address.stateProvince" />
      </div>
      <div class="form-group col-md-3">
        <label for="postalCode">Zipcode</label>
        <input
          name="postalCode"
          type="text"
          class="form-control"
          placeholder="e.g. 10101"
          v-model="address.postalCode.$model"
          :disabled="isDisabled"
        />
        <ValidationMessage :model="address.postalCode" />
      </div>
    </div>
  </div>
</template>

<script>
import states from "@/lookup/states";
import formatters from "@/formatters";
import ValidationMessage from "@/components/ValidationMessage";

export default {
  components: {
    ValidationMessage
  },
  props: {
    address: {
      type: Object,
    },
    isDisabled: { },
  },
  setup(props) {
   
    return {
      states,
      ...formatters
    };
  },
};
</script>