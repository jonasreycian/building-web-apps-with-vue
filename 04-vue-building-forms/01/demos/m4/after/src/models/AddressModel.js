import { required, minLength } from "@vuelidate/validators"; 
import { ref } from "vue";

export default class AddressModel {
  address1 = ref("");
  address2 = ref("");
  cityTown = ref("");
  stateProvince = ref("");
  postalCode = ref("");

  clear() {
    this.address1.value = "";
    this.address2.value = "";
    this.cityTown.value = "";
    this.stateProvince.value = "";
    this.postalCode.value = "";
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