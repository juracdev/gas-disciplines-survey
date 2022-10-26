import { DiscAnswersParseResult } from './parseDiscFormAnswers';
import { getDiscAvgAnswers } from './utils';

export function writeAnswersToSheet({
  dsAnswers,
  questions,
}: DiscAnswersParseResult) {
  const statSheet = SpreadsheetApp.getActive().getSheetByName('Статистика')!;
  statSheet.getRange('A:Z').clearContent();

  if (Object.keys(dsAnswers).length === 0 || questions.length === 0) {
    console.log('Недостаточно данных для расчёта статистики');
    statSheet
      .getRange(1, 1)
      .setValue('Недостаточно данных для расчёта статистики');
    return;
  }

  statSheet.getRange(1, 1).setValue('Наименование дисциплины');
  statSheet.getRange(1, 2, 1, questions.length).setValues([questions]);

  const avgAnswers = getDiscAvgAnswers(dsAnswers);

  const discs = Object.keys(dsAnswers).sort();

  let row = 2;

  discs.forEach((disc) => {
    const avgDisc = avgAnswers[disc];

    statSheet.getRange(row, 1).setValue(disc);
    statSheet
      .getRange(row, 2, 1, avgDisc.length)
      .setValues([avgDisc.map((x) => Number(x.toFixed(2)))]);

    const totalAvg = avgDisc.reduce((acc, curr) => acc + curr) / avgDisc.length;

    statSheet
      .getRange(row, avgDisc.length + 2, 1, 1)
      .setValue(Number(totalAvg.toFixed(2)));

    row++;
  });
}
