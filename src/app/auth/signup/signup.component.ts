import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequestPayload } from './signup-request.payload';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload:SignupRequestPayload;
  signupForm:any= FormGroup; 
  
  constructor(private authService:SharedService, private router:Router) {
    this.signupForm = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
   }
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  onSubmit(){

    if(this.signupForm.get('password').value != this.signupForm.get('confirmPassword').value){
      console.log('register failed');
      this.router.navigateByUrl('/register-success');
    }
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.confirmPassword = this.signupForm.get('confirmPassword').value;

    this.authService.signup(this.signupRequestPayload).subscribe(data => {
      console.log('register succes');
      this.router.navigateByUrl('/register-success');
    }, error => {
      console.log('register failed');
    });
  }

}
