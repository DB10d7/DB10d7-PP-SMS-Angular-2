import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddStudentToDayRequest } from './add-student-to-day/addStudentToDay.request.payload';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private httpClient: HttpClient) { }
  getDayList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/days/'));
    return this.httpClient.get<any>('http://localhost:8080/api/days/');
  }
  getDayListByBatch(name: String): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/days/by-batch/'+ name));
    return this.httpClient.get<any>('http://localhost:8080/api/days/by-batch/'+ name);
  }
  getDayListByStudent(name: String): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/students/'+ name + '/get/allDays'));
    return this.httpClient.get<any>('http://localhost:8080/api/students/'+ name + '/get/allDays');
  }
  addStudentToDay(addStudentToDayRequest: AddStudentToDayRequest ): Observable<any>{
    console.log(this.httpClient.post('http://localhost:8080/api/days/addStudent', addStudentToDayRequest, { responseType: 'text' } ));
    return this.httpClient.post('http://localhost:8080/api/days/addStudent', addStudentToDayRequest, { responseType: 'text' } );
  } 
  viewDay(name: String):Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/days/'+name));
    return this.httpClient.get<any>('http://localhost:8080/api/days/'+name);
  }
}
