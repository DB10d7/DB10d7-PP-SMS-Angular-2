import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm:any= FormGroup;
  name: String="";
  constructor(private authService:AuthService, private router:Router,private activatedRoute: ActivatedRoute) { 
    this.forgetPasswordForm = {
      username: '',
    };
  }

  ngOnInit(): void {
    this.forgetPasswordForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
  }
  onSubmit(){

    if(this.forgetPasswordForm.get('username').value === '' || this.forgetPasswordForm.get('username').value.length < 8 ){
      alert("UserName Has To Be 8 Characters Long");
      
      return;
    }
    this.name= this.forgetPasswordForm.get('username').value;
    this.authService.forgetPassword(this.name).subscribe(data => {
     // this.isError = false;
      alert(data);
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
      alert("Please Provide Valid User Name");
     // this.isError = true;
     //this.router.navigateByUrl('');
     
    });

  }
}

