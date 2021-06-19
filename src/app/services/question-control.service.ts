import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../dynamic-form/question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
        if(question.controlType!=='group'){
          if(question.controlType==='string'){
            group[question.key] = question.required ? new FormControl(question.value || '', [Validators.required, Validators.pattern('[a-zA-Z ]*')])
            : new FormControl(question.value || '',Validators.pattern('[a-zA-Z ]*'));
          }else{
            group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
            : new FormControl(question.value || '');
          }
            
        }
    });
    return new FormGroup(group);
  }
}