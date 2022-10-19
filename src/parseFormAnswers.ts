const ANSWERS_FORM_NAME = 'Ответы на форму';

type Answer = number;

export type DiscsAnswers = {
  [key: string]: Answer[][];
};

export type AnswersParseResult = {
  dsAnswers: DiscsAnswers;
  questions: string[];
};

export function parseFormAnswers(): AnswersParseResult {
  const ansSheet =
    SpreadsheetApp.getActive().getSheetByName(ANSWERS_FORM_NAME)!;
  const ansValues = ansSheet!.getDataRange().getValues().slice(1);

  const BASIC_QUESTS_AMOUNT = 4;

  if (!ansValues[0]) return { dsAnswers: {}, questions: [] };

  const branchesAmount = ansValues[0]
    .slice(BASIC_QUESTS_AMOUNT)
    .findIndex((x) => Boolean(x) && !Number.isNaN(Number(x)));

  const questions = ansSheet!
    .getDataRange()
    .getValues()[0]
    .slice(BASIC_QUESTS_AMOUNT + branchesAmount);

  // pop last el
  questions.pop();

  const dsAnswers: DiscsAnswers = {};

  ansValues.forEach((ansRow) => {
    const vals = ansRow.slice(BASIC_QUESTS_AMOUNT);
    const disc = vals.slice(0, branchesAmount).find((x) => Boolean(x.trim()));
    const answers = vals.slice(branchesAmount);

    // pop last el
    answers.pop();

    if (!dsAnswers[disc]) dsAnswers[disc] = [];
    dsAnswers[disc].push(answers);
  });

  return {
    dsAnswers,
    questions,
  };
}
