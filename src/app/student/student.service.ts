import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BYPASS_LOG } from 'src/app/token-interceptor';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  host:string= environment.apiUrl;
  xploreJobsApi:string='https://xplore.co.in/apiuser?token=ppofficerwx4356&mode=job&email=';
  ppPracticeApi: string='https://learn.packetprep.com/apiuser?token=ppofficerwx4356&info=b25&practice=java-programming';
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
  viewJobListByStudent(email: String):Observable<any>{
    console.log(this.httpClient.get(this.xploreJobsApi+email,{ context: new HttpContext().set(BYPASS_LOG, true) }));
    return this.httpClient.get<any>(this.xploreJobsApi+email,{ context: new HttpContext().set(BYPASS_LOG, true) });
  }
  viewPracticeByStudent(batch: String):Observable<any>{
    console.log(this.httpClient.get('https://learn.packetprep.com/apiuser?token=ppofficerwx4356&info='+ batch + '&practice=java-programming',{ context: new HttpContext().set(BYPASS_LOG, true) }));
    return this.httpClient.get<any>('https://learn.packetprep.com/apiuser?token=ppofficerwx4356&info='+ batch + '&practice=java-programming',{ context: new HttpContext().set(BYPASS_LOG, true) });
  }
  
}
