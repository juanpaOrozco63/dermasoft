import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../domains/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  //Url del API
  private url: string = environment.apiUrl + '/api/v1/patient';

  constructor(public httpClient: HttpClient) {}

  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  //Obtener token jwt para registro
  createTokenRegister(): HttpHeaders {
    let token = localStorage.getItem('tokenR');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  public findAll(): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url, { headers: headers });
  }

  public findById(patientIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/' + patientIdentification, {
      headers: headers,
    });
  }

  public save(patient: Patient): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url, patient, { headers: headers });
  }

  public update(patient: Patient): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url, patient, { headers: headers });
  }

  public delete(patientIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + '/' + patientIdentification, {
      headers: headers,
    });
  }

  public findByEmail(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/buscarPorEmail/' + email, {
      headers: headers,
    });
  }
}
