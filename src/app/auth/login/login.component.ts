import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  registerSuccessMessage: string="";
  isError: boolean=true;
  
  constructor(private authService:AuthService, private router:Router,private toastr: ToastrService,private activatedRoute: ActivatedRoute) {
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
      this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Login!';
        }
      });
  }
  onSubmit(){
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
      this.toastr.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
    });

  }
}
