import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LoginRequestPayload } from '../login/login-request.payload';
import { map, tap } from 'rxjs/operators';
import { UserUpdateRequestPayload } from '../update-user/update-user-request.payload';
import { ResetPasswordRequestPayload } from '../reset-password/reset-password-request.payload';

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
  activateAccount(token: String): Observable<any>{
    console.log(token);
    console.log(this.httpClient.get('http://localhost:8080/api/auth/accountVerification/'+ token));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/accountVerification/'+ token);
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
  forgetPassword(name: String): Observable<any>{
    console.log(name);
    console.log(this.httpClient.get('http://localhost:8080/api/auth/forgotPassword/'+ name));
    return this.httpClient.get('http://localhost:8080/api/auth/forgotPassword/'+ name, { responseType: 'text' });
  }
  resetPassword(resetPasswordRequest: ResetPasswordRequestPayload ): Observable<any>{
  
    // console.log(this.httpClient.post('http://localhost:8080/api/auth/resetPassword/'));
    return this.httpClient.post('http://localhost:8080/api/auth/resetPassword',resetPasswordRequest, { responseType: 'text' });
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
  getEmployeeList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/get/employees'));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/get/employees');
  }
  getUnverifiedUserList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/get/unverifiedUsers'));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/get/unverifiedUsers');
  }
  getTrainersList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/get/trainersList'));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/get/trainersList');
  }
  deleteUser(id: Number): Observable<any>{
    console.log(this.httpClient.delete('http://localhost:8080/api/auth/delete/'+ id));
    return this.httpClient.delete('http://localhost:8080/api/auth/delete/'+ id, { responseType: 'text' });
  }
  updateUser(name: String, userUpdateRequestPayload: UserUpdateRequestPayload ): Observable<any>{
    console.log(this.httpClient.put('http://localhost:8080/api/auth/update/'+ name,userUpdateRequestPayload));
    return this.httpClient.put('http://localhost:8080/api/auth/update/'+ name,userUpdateRequestPayload,{ responseType: 'text' });
  }
  getSingleUser(name : String): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/get/' + name));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/get/' + name);
  }
  getCurrentUser(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/get/currentUser'));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/get/currentUser');
  }
  getDefaultRoleUserList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/auth/get/defaultRoleUsers'));
    return this.httpClient.get<any>('http://localhost:8080/api/auth/get/defaultRoleUsers');
  }
  logout():Observable<any>{
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('role');
    return this.httpClient.post('http://localhost:8080/api/auth/logout',this.refreshTokenPayload, { responseType: 'text' });
  }

}
