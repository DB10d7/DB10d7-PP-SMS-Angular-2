import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  
  constructor(private authService:SharedService, private router:Router,private toastr: ToastrService,private activatedRoute: ActivatedRoute) {
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
  }
  onSubmit(){
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data) {
        console.log('login success');
        this.router.navigateByUrl('/userList');
      } else {
        console.log('Login failed');
      }
    });

  }
}
