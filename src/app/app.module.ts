import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { MillisecondFormatPipe } from './millisecond-format.pipe';
import { QuestionnaireComponent } from './questionnaire.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { PatientsComponent } from './patients.component';

import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    DynamicFormQuestionComponent,
    PatientsComponent,
    MillisecondFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NativeDateModule,
    BrowserAnimationsModule,
    MomentDateModule,
    RouterModule.forRoot([
      {path: 'questionnaire', component: QuestionnaireComponent},
      {path: 'patients', component: PatientsComponent},
    ]),
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
