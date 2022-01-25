import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  host:string= environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  getStudentList(): Observable<any>{
    console.log(this.httpClient.get(this.host+'api/students/'));
    return this.httpClient.get<any>(this.host+'api/students/');
  }
  viewStudent(name: String):Observable<any>{
    console.log(this.httpClient.get(this.host+'api/students/get/'+name));
    return this.httpClient.get<any>(this.host+'api/students/get/'+name);
  }
  getStudentListByBatch(name: String): Observable<any>{
    console.log(this.httpClient.get(this.host+'api/students/by-batch/'+ name));
    return this.httpClient.get<any>(this.host+'api/students/by-batch/'+ name);
  }
  getStudentListByDay(name: String): Observable<any>{
    console.log(this.httpClient.get(this.host+'api/students/by-day/'+ name));
    return this.httpClient.get<any>(this.host+'api/students/by-day/'+ name);
  }
  
}
