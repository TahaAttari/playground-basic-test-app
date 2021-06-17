import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';

import { MillisecondFormatPipe } from './millisecond-format.pipe';

import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';

@NgModule({
  declarations: [
    AppComponent,
    MillisecondFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
