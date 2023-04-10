import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../model/employee";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HrService {
  private readonly baseURL : string = "http://localhost:4001/employees";
  constructor(private httpClient : HttpClient) { }
  // async
  hireEmployee(employee : Employee) : Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseURL, employee);
  }
  updateEmployee(employee : Employee) : Observable<Employee> {
    return this.httpClient.put<Employee>(this.baseURL, employee);
  }
  fireEmployee(identity : string) : Observable<Employee> {
    return this.httpClient.delete<Employee>(`${this.baseURL}/${identity}`);
  }
  findEmployeeByIdentity(identity : string) : Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${identity}`);
  }
  findEmployees() : Observable<Array<Employee>> {
    return this.httpClient.get<Array<Employee>>(this.baseURL);
  }
}
