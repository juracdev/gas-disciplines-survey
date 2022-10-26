import { BasicAnswersParseResult } from './parseBasicFormAnswers';
import { getAvgAnswersObject, getTextAnswersPercentage } from './utils';

const STATS_SHEET_NAME = 'Статистика';

export function writeBasicAnswersToSheet(
  result: BasicAnswersParseResult | null
) {
  const statSheet =
    SpreadsheetApp.getActive().getSheetByName(STATS_SHEET_NAME)!;
  statSheet.getRange('A:Z').clearContent();

  if (result === null) {
    console.log('Невозможно посчитать статистику');
    statSheet.getRange(1, 1).setValue('Невозможно посчитать статистику');
    return;
  }

  const avgNumAnswers = getAvgAnswersObject(result.numberAnswers);

  statSheet.getRange(1, 1, 1, 2).setValues([['Вопрос', 'Средний балл']]);

  let rowNum = 2;
  Object.entries(avgNumAnswers).forEach(([key, val]) => {
    statSheet.getRange(rowNum, 1, 1, 2).setValues([[key, val]]);
    rowNum++;
  });

  rowNum++;

  const textAnsPerc = getTextAnswersPercentage(result.textAnswers);

  Object.entries(textAnsPerc).forEach(([questKey, percObj], idx) => {
    const choises = Object.keys(percObj);
    statSheet
      .getRange(rowNum, 1, 1, 1 + choises.length)
      .setValues([[questKey, ...choises]]);

    rowNum++;

    statSheet
      .getRange(rowNum, 2, 1, choises.length)
      .setValues([[...choises.map((x) => percObj[x])]]);

    rowNum++;
  });
}
