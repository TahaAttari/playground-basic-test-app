import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../dynamic-form/question-base';
import { QuestionControlService } from '../services/question-control.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as questionnaire from '../../assets/questionnaire.json'
import { QuestionService } from '../services/question.service';
//custom datepicker format
export const MY_FORMATS = {
    parse: {
      dateInput: 'YYYY-MM-DD',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  };

@Component({
  selector: 'questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  providers: [ QuestionControlService,
    // TODO : move providers to app.module wherever possible
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

]
})
export class QuestionnaireComponent implements OnInit {

  questions:QuestionBase<any>[];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService,
    //Generate questions from json
    service:QuestionService) {
        this.questions = service.getQuestions()
    }

  ngOnInit() {
    //Use QuestionControlService to apply Form Controls and Validation
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }
  //reshape the form response into the expected
  //QuestionnaireResponse
  onSubmit() {
    //TODO: add the rest of the possible value formats
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
            if(formData[item.linkId]){
              //if there's no response, omit the 
              //answer key entirely to make it unambiguous
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
              response.item.push(
                {
                  linkId:item.linkId,
                  text:item.text,
                }
              )
            }
          }
        else{
            let groupItem = []
            for(const subItem of item.item){
              //if there's no response, omit the 
              //answer key entirely to make it unambiguous
              if(formData[subItem.linkId]){
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
              else{
                groupItem.push(
                  {
                    linkId:subItem.linkId,
                    text:subItem.text,
                  }
                )
              }
            }
            response.item.push({
                linkId:item.linkId,
                text:item.text,
                item:groupItem
            })
        }
    }
    this.payLoad = JSON.stringify(response, null, 2 )
  }
}