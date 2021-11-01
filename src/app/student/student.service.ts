import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }
  getStudentList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/students/'));
    return this.httpClient.get<any>('http://localhost:8080/api/students/');
  }
  viewStudent(name: String):Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/students/get/'+name));
    return this.httpClient.get<any>('http://localhost:8080/api/students/get/'+name);
  }
  getStudentListByBatch(name: String): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/students/by-batch/'+ name));
    return this.httpClient.get<any>('http://localhost:8080/api/students/by-batch/'+ name);
  }
  getStudentListByDay(name: String): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/students/by-day/'+ name));
    return this.httpClient.get<any>('http://localhost:8080/api/students/by-day/'+ name);
  }
  
}
