import { QuestionBase } from './question-base';

export class BooleanQuestion extends QuestionBase<string> {
  controlType = 'boolean';
}