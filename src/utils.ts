import { DiscsAnswers } from './parseDiscFormAnswers';

type AvgAnswers = {
  [key: string]: number[];
};

export function getDiscAvgAnswers(dsAnswers: DiscsAnswers): AvgAnswers {
  const result: AvgAnswers = {};

  Object.keys(dsAnswers).forEach((disc) => {
    const allAnswers = dsAnswers[disc];
    const avgs = allAnswers
      .reduce((acc, curr) => {
        return acc.map((x, idx) => x + curr[idx]);
      })
      .map((x) => x / allAnswers.length);

    result[disc] = avgs;
  });

  return result;
}

export function getAvgAnswersObject(ansObj: { [question: string]: number[] }): {
  [question: string]: number;
} {
  return Object.entries(ansObj).reduce((obj, [key, val]) => {
    const avg = val.reduce((avg, curr) => avg + curr) / val.length;
    obj[key] = Number(avg.toFixed(1));
    return obj;
  }, {});
}

type AnswersPercentage = {
  [question: string]: { [ans: string]: number };
};

export function getTextAnswersPercentage(ansObj: {
  [question: string]: string[];
}): AnswersPercentage {
  const result: AnswersPercentage = {};

  Object.entries(ansObj).forEach(([ansKey, answers]) => {
    const amountObj: { [ansKey: string]: number } = {};

    answers.forEach((ans) => {
      if (!amountObj[ans]) amountObj[ans] = 0;
      amountObj[ans]++;
    });

    if (!result[ansKey]) result[ansKey] = {};

    const totalAmount = Object.values(amountObj).reduce(
      (acc, curr) => acc + curr
    );

    Object.entries(amountObj).forEach(([choiceKey, amount]) => {
      const perc = (100 * amount) / totalAmount;
      result[ansKey][choiceKey] = Number(perc.toFixed(2));
    });
  });

  return result;
}
