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

  getQuestions() {
    //to fully follow the Questionnaire spec
    //a recursive function would be best to
    //properly deal with nested Groups.
    //
    //Avoided writing one here to keep the
    //code as simple as possible since this 
    //is sufficient for the test data.
    const questions: QuestionBase<string>[] =[]
    questionnaire.item.forEach((item)=>{
        let data = {
            key:item.linkId,
            label:item.text
        }
        if(item.type=='boolean'){
            questions.push( new BooleanQuestion(data))
        }
        else if(item.type=='date'){
            questions.push( new DateQuestion(data))
        }
        else if(item.type=='string'){
            questions.push( new TextboxQuestion(data))
        }
        else if(item.type=="group"){
            questions.push(new GroupQuestion(data))
            item.item.forEach((subitem)=>{
                data = {
                    key:subitem.linkId,
                    label:subitem.text
                }
                if(subitem.type=='boolean'){
                    questions.push( new BooleanQuestion(data))
                }
                else if(subitem.type=='date'){
                    questions.push( new DateQuestion(data))
                }
                else if(subitem.type=='string'){
                    questions.push( new TextboxQuestion(data))
                }
            })
        }
    })
    return questions;
  }
}