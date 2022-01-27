import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddStudentToDayRequest } from './add-student-to-day/addStudentToDay.request.payload';
import { CreateDayRequestPayload } from './create-day/create-day-request.payload';
import { RemoveStudentRequest } from '../student/student-list-by-day/removeStudentFromDayRequest.payload';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  host:string= environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  getDayList(): Observable<any>{
    console.log(this.httpClient.get(this.host+'api/days/'));
    return this.httpClient.get<any>(this.host+'api/days/');
  }
  getDayListByBatch(name: String): Observable<any>{
    console.log(this.httpClient.get(this.host+'api/days/by-batch/'+ name));
    return this.httpClient.get<any>(this.host+'api/days/by-batch/'+ name);
  }
  getDayListByStudent(name: String): Observable<any>{
    console.log(this.httpClient.get(this.host+'api/students/'+ name + '/get/allDays'));
    return this.httpClient.get<any>(this.host+'api/students/'+ name + '/get/allDays');
  }
  addStudentToDay(addStudentToDayRequest: AddStudentToDayRequest ): Observable<any>{
    console.log(this.httpClient.post(this.host+'api/days/addStudent', addStudentToDayRequest, { responseType: 'text' } ));
    return this.httpClient.post(this.host+'api/days/addStudent', addStudentToDayRequest, { responseType: 'text' } );
  } 
  viewDay(name: String):Observable<any>{
    console.log(this.httpClient.get(this.host+'api/days/'+name));
    return this.httpClient.get<any>(this.host+'api/days/'+name);
  }
  createDay(createDayRequestPayload: CreateDayRequestPayload):Observable<any>{
    console.log(this.httpClient.post(this.host+'api/days/', createDayRequestPayload ));
    return this.httpClient.post(this.host+'api/days/', createDayRequestPayload, { responseType: 'text' });
  }
  updateDay(name : String, updateDayRequestPayload: CreateDayRequestPayload):Observable<any>{
    console.log(this.httpClient.put(this.host+'api/days/update/'+ name, updateDayRequestPayload ));
    return this.httpClient.put<any>(this.host+'api/days/update/'+ name, updateDayRequestPayload);
  }
  removeStudentFromDay(removeStudentRequest : RemoveStudentRequest): Observable<any>{
    console.log(this.httpClient.post(this.host+'api/days/removeStudent', removeStudentRequest, { responseType: 'text' } ));
    return this.httpClient.post(this.host+'api/days/removeStudent', removeStudentRequest, { responseType: 'text' } );
  }
  studentListByBatchNotPresent(batchDayRequest : any): Observable<any>{
    console.log(batchDayRequest);
    console.log(this.httpClient.post(this.host+'api/days/studentsNotPresent', batchDayRequest));
    return this.httpClient.post<any>(this.host+'api/days/studentsNotPresent', batchDayRequest);
  }
  deleteDay(id: Number): Observable<any>{
    console.log(this.httpClient.delete(this.host+'api/days/delete/'+ id,));
    return this.httpClient.delete(this.host+'api/days/delete/'+ id,{ responseType: 'text' });
  }
}
