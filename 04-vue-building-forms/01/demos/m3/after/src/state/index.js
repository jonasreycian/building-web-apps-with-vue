import { reactive, ref } from "vue";
import BillingAddressModel from "../models/BillingAddressModel";
import CreditCardModel from "../models/CreditCardModel";
import ShippingAddressModel from "../models/ShippingAddressModel";

export default {
  billing: reactive(new BillingAddressModel()),
  shipping: reactive(new ShippingAddressModel()),
  creditcard: reactive(new CreditCardModel()),
  errorMessage: ref("")  
};