import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { creditcard } from "@/validators";

export default class CreditCardModel {
  number = "";
  nameOnCard = "";
  expirationMonth = 1;
  expirationYear = 2020;
  cvv = "";

  get rules() {
    return {
      number: { required, creditcard },
      nameOnCard: { required },
      expirationMonth: { required },
      expirationYear: { required },
      cvv: { required },
    };
  }

  toModel() {
    return useVuelidate(this.rules, this);
  }
}