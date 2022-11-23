import AddressModel from "./AddressModel";

export default class BillingAddressModel extends AddressModel {
  sameAsShipping = false;  

  get rules() {
    return Object.assign({ sameAsShipping: {} }, super.rules);
  }
} 