import { parseBasicFormAnswers, TransformRow } from './parseBasicFormAnswers';
import { parseDiscFormAnswers } from './parseDiscFormAnswers';
import { writeAnswersToSheet } from './writeAnswersToSheet';
import { writeBasicAnswersToSheet } from './writeBasicAnswersToSheet';

function calcServeyStats(coumnsBeforeAnswers: number) {
  const parseResult = parseDiscFormAnswers(coumnsBeforeAnswers);
  writeAnswersToSheet(parseResult);
}

function calcBasicStats(
  transformRow: TransformRow,
  multipleChoisesIdxs: number[]
) {
  const result = parseBasicFormAnswers(transformRow, multipleChoisesIdxs);
  writeBasicAnswersToSheet(result);
}
