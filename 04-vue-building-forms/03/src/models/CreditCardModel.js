import { ref } from "vue";

export default class CreditCardModel {
  number = ref("");
  nameOnCard = ref("");
  expirationMonth = ref(1);
  expirationYear = ref(2020);
  cvv = ref("");  
}