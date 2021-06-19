import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../app/services/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { QuestionService } from '../services/question.service';

import { QuestionBase } from '../dynamic-form/question-base';
import { Observable } from 'rxjs';

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
  selector: 'patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    QuestionService
  ],
})

export class PatientsComponent implements OnInit {
  title = 'fhir-app-test';
  Patients = []
  controls = {
    name:new FormControl('', Validators.pattern('[a-zA-Z ]*')),
    birthdate: new FormControl('')
  }
  form = new FormGroup(this.controls)
  request_time = undefined
  refresh_disabled = true
  questions$: Observable<QuestionBase<any>[]>;

  constructor(
    private apiService: ApiService,
  ) { 
  }
  

  ngOnInit() {
    let start = Date.now()
    this.apiService.getPatients().subscribe(
      data => {
        this.Patients = this.flattenPatientObj(data)
      },
      error => {
        this.refresh_disabled=false
        console.warn(error)},
      () => {
        let finish = Date.now()
        this.refresh_disabled=false
        this.request_time = finish - start
      }
    )
    // this.apiService.getPatientsModified().subscribe(
    //   data => {
    //     console.log(data)
    //     // this.Patients = this.flattenPatientObj(data)
    //   },
    //   error => console.warn(error),
    // )
  }

  flattenPatientObj = (response) => {
    let output = (response.entry || []).map((item) => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: (name.length>0)?`${((name[0] || {}).given || []).join(" ")} ${(name[0] || {}).family}`:'N/A',
        gender: item.resource.gender?item.resource.gender:'unnknown',
        dob: item.resource.birthDate?item.resource.birthDate:'N/A',
      };
    });
    output.sort((a,b)=>{
      let dob_a = a.dob?Date.parse(a.dob):-3155760000000
      let dob_b = b.dob?Date.parse(b.dob):-3155760000000
      return dob_b-dob_a
  })
  return output
  }
  queryPatients = () => {
    let start = Date.now()
    this.refresh_disabled=true
    if(this.controls.name.value||this.controls.birthdate.value){
        let query = {}
        if(this.controls.name.value){
            query = {...query,name:this.controls.name.value}
        }
        if(this.controls.birthdate.value){
            query = {...query,birthdate:(new Date(this.controls.birthdate.value)).toISOString().split('T')[0]}
        }
        this.apiService.getPatients(query).subscribe(
          data => {
            this.Patients = this.flattenPatientObj(data)
          },
          error => {
            this.refresh_disabled=false
            console.warn(error)},
          () => {
            let finish = Date.now()
            this.refresh_disabled=false
            this.request_time = finish - start
          }
        )
    }
    else{
      this.apiService.getPatients().subscribe(
        data => {
          this.Patients = this.flattenPatientObj(data)
        },
        error => {
          this.refresh_disabled=false
          console.warn(error)},
      () => {
          this.refresh_disabled=false
          let finish = Date.now()
          this.request_time = finish - start
        }
      )
    }
  }
}


