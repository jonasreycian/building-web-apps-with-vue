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
}