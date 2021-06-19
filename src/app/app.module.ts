//modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';

//pages
import { QuestionnaireComponent } from './pages/questionnaire.component';
import { PatientsComponent } from './pages/patients.component';

//components
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import { AppComponent } from './app.component';

//functions
import { MillisecondFormatPipe } from './millisecond-format.pipe';
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
