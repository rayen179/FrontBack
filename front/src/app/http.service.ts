import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee, Question } from './Componends/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  apiUrl = 'https://localhost:7004';
  http = inject(HttpClient);
  toaster: any;
  constructor() {}
  showSuccess() {
    this.toaster.success('Record added sucessfully.');
  }
  //API for employee
  createEmployee(employee: IEmployee) {
    return this.http.post(this.apiUrl + '/api/Employee/register/', employee);
  }

  getEmployee(employeeId: number) {
    return this.http.get<IEmployee>(
      this.apiUrl + '/api/Employee/' + employeeId
    );
  }

  updateEmployee(employeeId: number, employee: IEmployee) {

    return this.http.put<IEmployee>(
      this.apiUrl + '/api/Employee/' + employeeId,
      employee
    );
  }
  deleteEmployee(employeeId: number) {
    return this.http.delete(this.apiUrl + '/api/Employee/' + employeeId);
  }
  //API for Question
  getAllQuestion() {
    console.log('getAllQuestion', localStorage.getItem('token'));
    return this.http.get<Question[]>(this.apiUrl + '/api/Questions');
  }

  updateQuestion(employeeId: number, employee: IEmployee) {

    return this.http.put<IEmployee>(
      this.apiUrl + '/api/Employee/' + employeeId,
      employee
    );
  }


}
