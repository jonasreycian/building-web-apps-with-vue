console.log(
  Intl.NumberFormat("hr", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "name"
  }).format(6.22)
);
