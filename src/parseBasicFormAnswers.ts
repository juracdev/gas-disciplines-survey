const ANSWERS_FORM_NAME = 'Ответы на форму';

type NumberAnswers = {
  [question: string]: number[];
};

type TextAnswers = {
  [question: string]: string[];
};

export type TransformRow = (row: any[]) => any[];

export type BasicAnswersParseResult = {
  numberAnswers: NumberAnswers;
  textAnswers: TextAnswers;
};

export function parseBasicFormAnswers(
  transformRow: TransformRow,
  multipleChoisesIdxs: number[]
): BasicAnswersParseResult | null {
  const ansSheet =
    SpreadsheetApp.getActive().getSheetByName(ANSWERS_FORM_NAME)!;
  const ansValues = ansSheet!.getDataRange().getValues().slice(1);

  if (!ansValues[0]) return null;

  const questions = transformRow(ansSheet!.getDataRange().getValues()[0]);

  const numberAnswers: NumberAnswers = {};
  const textAnswers: TextAnswers = {};

  ansValues.forEach((ansRow) => {
    const answers = transformRow(ansRow);

    answers.forEach((ans, idx) => {
      const quest = questions[idx];

      const tagetObj = Number.isNaN(Number(ans)) ? textAnswers : numberAnswers;

      if (!tagetObj[quest]) tagetObj[quest] = [];

      if (multipleChoisesIdxs.includes(idx)) {
        ans.split(',').forEach((x) => tagetObj[quest].push(x as never));
      } else {
        tagetObj[quest].push(ans as never);
      }
    });
  });

  return { numberAnswers, textAnswers };
}
