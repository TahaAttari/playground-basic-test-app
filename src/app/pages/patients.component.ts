import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../app/services/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
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
  selector: 'patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [
    // TODO : move providers to app.module wherever possible
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

  //This stops the button being pressed before the
  // request is complete
  refresh_disabled = true
  constructor(
    private apiService: ApiService,
  ) { 
  }
  

  ngOnInit() {
    //start timer
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
        //enable button
        this.refresh_disabled=false
        //output time taken
        this.request_time = finish - start
      }
    )
    //this is the modified function which returns a subset
    //of patients (1960-1965)
    this.apiService.getPatientsModified().subscribe(
      data => {
        console.log(data)
      },
      error => console.warn(error),
    )
  }

  flattenPatientObj = (response) => {
    let output = (response.entry || []).map((item) => {
      const name = item.resource.name || [];
      //replace undefined or empty values with  
      //unknown (to match the usual output from the server) or N/A
      return {
        id: item.resource.id,
        name: (name.length>0)?`${((name[0] || {}).given || []).join(" ")} ${(name[0] || {}).family}`:'N/A',
        gender: item.resource.gender?item.resource.gender:'unknown',
        dob: item.resource.birthDate?item.resource.birthDate:'N/A',
      };
    });
    //sort the Patients by youngest first
    output.sort((a,b)=>{
      //if there is no DOB set DOB to 100 years in the past for sorting
      let dob_a = a.dob?Date.parse(a.dob):-3155760000000
      let dob_b = b.dob?Date.parse(b.dob):-3155760000000
      return dob_b-dob_a
  })
  return output
  }
  queryPatients = () => {
    //start timer
    let start = Date.now()
    //prevent multi-click
    this.refresh_disabled=true
    //if any input is received
    if(this.controls.name.value||this.controls.birthdate.value){
        let query = {}
        if(this.controls.name.value){
            query = {...query,name:this.controls.name.value}
        }
        if(this.controls.birthdate.value){
            //convert DateTime to Date
            query = {...query,birthdate:(new Date(this.controls.birthdate.value)).toISOString().split('T')[0]}
        }
        this.apiService.getPatients(query).subscribe(
          data => {
            //update with new data
            this.Patients = this.flattenPatientObj(data)
          },
          error => {
            this.refresh_disabled=false
            console.warn(error)},
          () => {
            //end timer
            let finish = Date.now()
            //enable button
            this.refresh_disabled=false
            //output time taken
            this.request_time = finish - start
          }
        )
    }
    else{
      //if the query is empty get all patients
      this.apiService.getPatients().subscribe(
        data => {
          //update with new data
          this.Patients = this.flattenPatientObj(data)
        },
        error => {
          this.refresh_disabled=false
          console.warn(error)},
      () => {
          //end timer
          let finish = Date.now()
          //enable button
          this.refresh_disabled=false
          //output time taken
          this.request_time = finish - start
        }
      )
    }
  }
}


