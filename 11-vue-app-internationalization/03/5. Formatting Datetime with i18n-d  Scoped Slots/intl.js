const date = new Date(
  Date.UTC(2021, 4, 2, 14, 17, 20, 200)
);

console.log(
  Intl.DateTimeFormat("hr", {
    dateStyle: "short"
  }).formatToParts(date)
);
