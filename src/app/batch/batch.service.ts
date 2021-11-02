import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateBatchRequestPayload } from './create-batch/create-batch-request.payload';
import { UpdateBatchRequest } from './update-batch/updateBatchRequest.payload';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private httpClient: HttpClient) { }
  getBatchList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/batch/'));
    return this.httpClient.get<any>('http://localhost:8080/api/batch/');
  }
  viewBatch(name: String):Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/batch/'+name));
    return this.httpClient.get<any>('http://localhost:8080/api/batch/'+name);
  }
  createBatch(createBatchRequestPayload: CreateBatchRequestPayload): Observable<String>{
    console.log(this.httpClient.post('http://localhost:8080/api/batch/create',createBatchRequestPayload));
    return this.httpClient.post<String>('http://localhost:8080/api/batch/create', createBatchRequestPayload);
  }
  updateBatch(name: String, updateBatchRequest:UpdateBatchRequest){
    console.log(this.httpClient.put('http://localhost:8080/api/batch/update/' + name ,updateBatchRequest));
    return this.httpClient.put<String>('http://localhost:8080/api/batch/update/' + name , updateBatchRequest);
  }
}
