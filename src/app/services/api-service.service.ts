import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPatients(query=undefined) {
    if(query){
      let queryString = "?"
      for (const [key,value] of Object.entries(query)){
        queryString += `${key}=${value},`
      }
      return this.httpClient.get(environment.queryURI + '/Patient' + queryString,
      { headers: this.getHeaders() });
    }
    else{
      return this.httpClient.get(environment.queryURI + '/Patient',
      { headers: this.getHeaders() });
    }
  }
  getPatientsModified() {
      return this.httpClient.get(environment.queryURI + '/Patient?birthdate=ge1960-01-01&birthdate=le1965-12-31',
      { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }
}


