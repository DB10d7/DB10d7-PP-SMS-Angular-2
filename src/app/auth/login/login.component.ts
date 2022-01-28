import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any= FormGroup;
  loginRequestPayload:any= LoginRequestPayload;
  //registerSuccessMessage: string="";
 // isError: boolean=true;
  
  constructor(private authService:AuthService, private router:Router,private activatedRoute: ActivatedRoute) {
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
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      
    });
  /*  this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      }); */
      // this.activatedRoute.queryParams
      // .subscribe(params => {
      //   if (params.registered !== undefined && params.registered === 'true') {
      //     this.toastr.success('Signup Successful');
      //     this.registerSuccessMessage = 'Please Login!';
      //   }
      // });
  }
  forgetPassword(){
    this.router.navigate(['forget-Password']);
  }
  onSubmit(){

    // if(this.loginForm.get('password').value === '' || this.loginForm.get('password').value.length<8){
    //   console.log('register failed');
    //   alert("Password's Has To Be 8 Characters Long");
      
    //   return;
    // }
    // if(this.loginForm.get('username').value === '' || this.loginForm.get('username').value.length < 8 ){
    //   alert("UserName Has To Be 8 Characters Long");
      
    //   return;
    // }

    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    

    this.authService.login(this.loginRequestPayload).subscribe(data => {
     // this.isError = false;
      this.router.navigateByUrl('');
      // if(this.authService.getUserRole() === 'SUPER-ADMIN'){
      //   this.router.navigateByUrl('superAdminHomePage');
      // }else if(this.authService.getUserRole() === 'TRAINER'){
      //   this.router.navigateByUrl('trainerHomePage');
      // }else if(this.authService.getUserRole() === 'ADMIN'){
      //   this.router.navigateByUrl('adminHomePage');
      // }else if(this.authService.getUserRole() === 'STUDENT'){
      //   this.router.navigateByUrl('studentHomePage');
      // }else{
      //   this.router.navigateByUrl('defaultPage');
      // }
      
    }, error => {
      alert("Please Provide Valid User Name And Password");
     // this.isError = true;
      throwError(error);
    });

  }
  
}
