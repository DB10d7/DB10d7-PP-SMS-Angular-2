import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LoginRequestPayload } from '../login/login-request.payload';
import { map, tap } from 'rxjs/operators';
import { UserUpdateRequestPayload } from '../update-user/update-user-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('role',data.role);
      /*  this.loggedIn.emit(true);
        this.username.emit(data.username); */
        return true;
      }));
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getUserRole(){
    return this.localStorage.retrieve('role');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  } 
  getUserList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/'));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/');
  }
  updateUser(name: String, userUpdateRequestPayload: UserUpdateRequestPayload ): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/'));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/');
  }
  getSingleUser(name : String): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/get' + name));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/get' + name);
  }

}
