import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ResetPasswordRequestPayload } from './reset-password-request.payload';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordRequest: ResetPasswordRequestPayload;
  resetPasswordForm:any= FormGroup;
  constructor(private authService:AuthService, private router:Router,private route: ActivatedRoute) {
    this.resetPasswordRequest = {
      token:'',
      password: ''
    };
    this.resetPasswordForm = {
      password: '',
      confirmPassword: ''
    }
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  onSubmit(){

    if((this.resetPasswordForm.get('password').value === '' || this.resetPasswordForm.get('confirmPassword').value === '') || (this.resetPasswordForm.get('password').value.length<8 || this.resetPasswordForm.get('confirmPassword').value.length<8)){
      console.log('register failed');
      alert("Password's Has To Be 8 Characters Long");
      
      return;
    }
    if(this.resetPasswordForm.get('password').value !== this.resetPasswordForm.get('confirmPassword').value){
      console.log('register failed');
      alert("Password's Do Not Match");
      
      return;
    }
    
    
    this.resetPasswordRequest.token = this.route.snapshot.params['token'];
    this.resetPasswordRequest.password = this.resetPasswordForm.get('password').value;
    

    this.authService.resetPassword(this.resetPasswordRequest)
      .subscribe(data => {
        this.ngOnInit();
        if(data === "Reset-Password Successful"){
          alert(data);
          // alert("Please Check Your Email To Activate Your Account")
          this.router.navigate(['/login'],
         );
        }else{
          alert(data);
          this.ngOnInit();
        }
        
      }, error => {
        console.log(error);
        // this.toastr.error('Registration Failed! Please try again');
      });
  }

}


