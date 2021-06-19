import { QuestionBase } from './question-base';

export class GroupQuestion extends QuestionBase<string> {
  controlType = 'group';
}