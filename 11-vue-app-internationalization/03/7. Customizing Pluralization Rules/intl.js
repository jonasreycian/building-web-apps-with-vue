const pr = new Intl.PluralRules("hr");

for (let i = 0; i < 101; i++) {
  console.log(`${i} ${pr.select(i)}`);
}
