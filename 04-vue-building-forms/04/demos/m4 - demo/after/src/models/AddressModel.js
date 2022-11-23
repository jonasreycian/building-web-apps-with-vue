import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";

export default class AddressModel {
  address1 = "";
  address2 = "";
  cityTown = "";
  stateProvince = "";
  postalCode = "";

  setFrom(address) {
    this.address1 = address.address1;
    this.address2 = address.address2;
    this.cityTown = address.cityTown;
    this.stateProvince = address.stateProvince;
    this.postalCode = address.postalCode;
  }

  get rules() {
    return {
      address1: { required, minLength: minLength(5) },
      address2: {},
      cityTown: { required, minLength: minLength(2) },
      stateProvince: { required },
      postalCode: { required, minLength: minLength(5) },
    };
  }

  toModel() {
    return useVuelidate(this.rules, this);
  }
}