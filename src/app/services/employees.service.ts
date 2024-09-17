import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../models/employees.model';
import constants from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private url=constants.URL;
  constructor(private http:HttpClient) { 
    
  }

  getEmp(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.url)
  }

  delEmp(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }

  updateEmp(id: any, employee: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, employee)
  }

  addEmp(payload: any) {
    return this.http.post(this.url, payload)
  }
}
