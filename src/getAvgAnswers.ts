import { DiscsAnswers } from './parseFormAnswers';

type AvgAnswers = {
  [key: string]: number[];
};

export function getAvgAnswers(dsAnswers: DiscsAnswers): AvgAnswers {
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
