import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
import { FormControl, Validators } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { QuestionService } from './services/question.service';

import { QuestionBase } from './question-base';
import { Observable } from 'rxjs';
import { QuestionControlService } from './services/question-control.service';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    QuestionService,
    QuestionControlService
  ],
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';
  questions$: QuestionBase<any>[];

  constructor(
    service:QuestionService,
  ) { 
    this.questions$ = service.getQuestions()
  }
  
  ngOnInit() {
    console.log('started')
  }

}



