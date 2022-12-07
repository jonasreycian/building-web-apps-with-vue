console.log(
  Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD"
  }).formatToParts(6.22)
);
