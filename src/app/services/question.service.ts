import { Injectable } from '@angular/core';

import { DateQuestion } from '../question-date';
import { BooleanQuestion } from '../question-boolean';
import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';
import { GroupQuestion } from '../question-group';
import * as questionnaire from '../../assets/questionnaire.json'
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] = questionnaire.item.map((item)=>{
        if(item.type=='boolean'){
            return new BooleanQuestion({
                key:item.linkId,
                label:item.text
            })
        }
        else if(item.type=='date'){
            return new DateQuestion({
                key:item.linkId,
                label:item.text
            })
        }
        else if(item.type=='string'){
            return new TextboxQuestion({
                key:item.linkId,
                label:item.text
            })
        }
        else if(item.type=="group"){
            return new GroupQuestion({
                key:item.linkId,
                label:item.text,
                item:item.item
            })
        }
    })

    return of(questions.sort((a, b) => a.order - b.order));
  }
}