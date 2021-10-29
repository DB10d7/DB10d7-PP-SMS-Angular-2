import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { LoginRequestPayload } from './login-request.payload';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any= FormGroup;
  loginRequestPayload:any= LoginRequestPayload;
  
  constructor(private authService:SharedService, private router:Router) {
    this.loginForm = {
      username: '',
      password: '',
      confirmPassword: ''
    };
    this.loginRequestPayload = {
      username: '',
      password: '',
      confirmPassword: ''
    };
   }

  ngOnInit(): void {
  }
  onSubmit(){
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.loginRequestPayload.password = this.loginForm.get('confirmPassword').value

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data) {
        console.log('login success');
        this.router.navigateByUrl('/studentList');
      } else {
        console.log('Login failed');
      }
    });

  }
}
