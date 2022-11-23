import { ref } from "vue";
import AddressModel from "./AddressModel";

export default class ShippingAddressModel extends AddressModel {
  fullName = ref("");
  company = ref("");  
}