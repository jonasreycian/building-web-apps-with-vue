function hrPluralizationRules(
  choice,
  choicesLength
) {
  choice = Math.abs(choice);
  let zero, one, few, other;
  const choiceIndexes = [0, 1, 2, 3];
  if (choicesLength > 3) {
    [zero, one, few, other] = choiceIndexes;
  } else if (choicesLength === 3) {
    [one, few, other] = choiceIndexes;
    zero = other;
  } else {
    return 0;
  }

  if (choice === 0) {
    return zero;
  }

  const teen =
    choice % 100 > 10 && choice % 100 < 20;

  if (!teen) {
    if (choice % 10 === 1) {
      return one;
    }
    if (choice % 10 >= 2 && choice % 10 <= 4) {
      return few;
    }
  }
  return other;
}

export default {
  hr: hrPluralizationRules
};
