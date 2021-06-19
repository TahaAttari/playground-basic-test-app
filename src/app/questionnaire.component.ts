import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './question-base';
import { QuestionControlService } from './services/question-control.service';
import * as questionnaire from '../assets/questionnaire.json'

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './questionnaire.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    const ValueDict = {
        boolean:'valueBoolean',
        date:'valueDate',
        string:'valueString'
    }
    let response = {
        status:'completed',
        questionnaire:questionnaire.url,
        authored:new Date().toISOString(),
        item:[]
    }
    let formData = this.form.getRawValue()
    for(const item of questionnaire.item){
        if(item.type!=='group'){
            response.item.push(
                {
                    linkId:item.linkId,
                    text:item.text,
                    answer:{
                        [ValueDict[item.type]]:formData[item.linkId]
                    }
                }
            )
        }
        else{
            let groupItem = []
            for(const subItem of item.item){
                groupItem.push(
                    {
                        linkId:subItem.linkId,
                        text:subItem.text,
                        answer:{
                            [ValueDict[subItem.type]]:formData[subItem.linkId]
                        }
                    }
                )
            }
            response.item.push({
                linkId:item.linkId,
                text:item.text,
                item:groupItem
            })
        }
    }
    this.payLoad = JSON.stringify(response, null, 4)
  }
}