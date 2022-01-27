import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateBatchRequestPayload } from './create-batch/create-batch-request.payload';
import { UpdateBatchRequest } from './update-batch/updateBatchRequest.payload';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  host:string= environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  getBatchList(): Observable<any>{
    console.log(this.httpClient.get(this.host+'api/batch/'));
    return this.httpClient.get<any>(this.host+'api/batch/');
  }
  viewBatch(name: String):Observable<any>{
    console.log(this.httpClient.get(this.host+'api/batch/'+name));
    return this.httpClient.get<any>(this.host+'api/batch/'+name);
  }
  createBatch(createBatchRequestPayload: CreateBatchRequestPayload): Observable<any>{
    console.log(this.httpClient.post(this.host+'api/batch/create',createBatchRequestPayload));
    return this.httpClient.post(this.host+'api/batch/create', createBatchRequestPayload,{ responseType: 'text' });
  }
  updateBatch(name: String, updateBatchRequest:UpdateBatchRequest):Observable<any>{
    console.log(this.httpClient.put(this.host+'api/batch/update/' + name ,updateBatchRequest));
    return this.httpClient.put<any>(this.host+'api/batch/update/' + name , updateBatchRequest);
  }
}
