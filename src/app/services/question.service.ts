import { Injectable } from '@angular/core';

import { DateQuestion } from '../dynamic-form/question-date';
import { BooleanQuestion } from '../dynamic-form/question-boolean';
import { QuestionBase } from '../dynamic-form/question-base';
import { TextboxQuestion } from '../dynamic-form/question-textbox';
import { GroupQuestion } from '../dynamic-form/question-group';
import * as questionnaire from '../../assets/questionnaire.json'
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] =[]
    questionnaire.item.forEach((item)=>{
        if(item.type=='boolean'){
            questions.push( new BooleanQuestion({
                key:item.linkId,
                label:item.text
            }))
        }
        else if(item.type=='date'){
            questions.push( new DateQuestion({
                key:item.linkId,
                label:item.text
            }))
        }
        else if(item.type=='string'){
            questions.push( new TextboxQuestion({
                key:item.linkId,
                label:item.text
            }))
        }
        else if(item.type=="group"){
            questions.push(new GroupQuestion({
                key:item.linkId,
                label:item.text,
            }))
            item.item.forEach((subitem)=>{
                if(subitem.type=='boolean'){
                    questions.push( new BooleanQuestion({
                        key:subitem.linkId,
                        label:subitem.text
                    }))
                }
                else if(subitem.type=='date'){
                    questions.push( new DateQuestion({
                        key:subitem.linkId,
                        label:subitem.text
                    }))
                }
                else if(subitem.type=='string'){
                    questions.push( new TextboxQuestion({
                        key:subitem.linkId,
                        label:subitem.text
                    }))
                }
            })
        }
    })

    return questions;
  }
}