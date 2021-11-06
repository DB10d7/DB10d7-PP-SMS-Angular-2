import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddStudentToDayRequest } from './add-student-to-day/addStudentToDay.request.payload';
import { CreateDayRequestPayload } from './create-day/create-day-request.payload';
import { RemoveStudentRequest } from '../student/student-list-by-day/removeStudentFromDayRequest.payload';

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
  createDay(createDayRequestPayload: CreateDayRequestPayload):Observable<any>{
    console.log(this.httpClient.post('http://localhost:8080/api/days/', createDayRequestPayload ));
    return this.httpClient.post<any>('http://localhost:8080/api/days/', createDayRequestPayload);
  }
  updateDay(name : String, updateDayRequestPayload: CreateDayRequestPayload):Observable<any>{
    console.log(this.httpClient.put('http://localhost:8080/api/days/update/'+ name, updateDayRequestPayload ));
    return this.httpClient.put<any>('http://localhost:8080/api/days/update/'+ name, updateDayRequestPayload);
  }
  removeStudentFromDay(removeStudentRequest : RemoveStudentRequest): Observable<any>{
    console.log(this.httpClient.post('http://localhost:8080/api/days/removeStudent', removeStudentRequest, { responseType: 'text' } ));
    return this.httpClient.post('http://localhost:8080/api/days/removeStudent', removeStudentRequest, { responseType: 'text' } );
  }
}
