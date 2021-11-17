import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequestPayload } from './signup-request.payload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload:SignupRequestPayload;
  signupForm:any= FormGroup; 
  
  constructor(private authService:AuthService, private router:Router,private toastr: ToastrService) {
    this.signupForm = {
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.signupRequestPayload = {
      username: '',
      name:'',
      email: '',
      password: '',
      confirmPassword: ''
    };
   }
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  onSubmit(){

    if((this.signupForm.get('password').value === '' || this.signupForm.get('confirmPassword').value === '') || (this.signupForm.get('password').value.length<8 || this.signupForm.get('confirmPassword').value.length<8)){
      console.log('register failed');
      alert("Password's Has To Be 8 Characters Long");
      
      return;
    }
    if(this.signupForm.get('password').value !== this.signupForm.get('confirmPassword').value){
      console.log('register failed');
      alert("Password's Do Not Match");
      
      return;
    }
    if(this.signupForm.get('username').value === '' || this.signupForm.get('username').value.length < 8 ){
      alert("UserName Has To Be 8 Characters Long");
      
      return;
    }
    if(this.signupForm.get('name').value === '' || this.signupForm.get('name').value.length < 8 ){
      alert("Name Has To Be 8 Characters Long");
      
      return;
    }
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.name = this.signupForm.get('name').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.confirmPassword = this.signupForm.get('confirmPassword').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.ngOnInit();
        if(data === "User Registered Successfully"){
          alert(data);
          alert("Please Check Your Email To Activate Your Account")
          this.router.navigate(['/login'],
         );
        }else{
          alert(data);
          this.ngOnInit();
        }
        
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }

}
