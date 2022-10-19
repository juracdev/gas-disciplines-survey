import { parseFormAnswers } from './parseFormAnswers';
import { writeAnswersToSheet } from './writeAnswersToSheet';

function main() {
  const parseResult = parseFormAnswers();
  writeAnswersToSheet(parseResult);
}
