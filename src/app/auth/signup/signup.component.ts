import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequestPayload } from './signup-request.payload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload:SignupRequestPayload;
  signupForm:any= FormGroup; 
  selectedFile: any;
  uploadImageData: any= FormData;
  message: string="";
  constructor(private authService:AuthService,private httpClient: HttpClient, private router:Router,private toastr: ToastrService) {
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
      confirmPassword: '',
      selectedFile: File
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
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    
  }
  uploadUserImage(){
    this.uploadImageData = new FormData();
    this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.uploadImageData.append('username', this.signupRequestPayload.username)
    console.log(this.uploadImageData.get('imageFile').value);
    console.log(this.uploadImageData.get('username').value);
    
    this.httpClient.post('http://localhost:8080/api/user/image/upload', this.uploadImageData, { responseType: 'text' })
      .subscribe((response) => {
        if (response === "Image Uploaded") {
          this.message = 'Image uploaded successfully';
          alert(this.message);
          alert("User Registered Successfully");
          alert("Please Check Your Email To Activate Your Account")
          this.router.navigate(['/login']);
        } else {
          this.message = 'Image not uploaded successfully';
          alert(this.message);
        }
        
      }, error =>{
        alert('Please reduce the image size to 60 kb')
      }
      );
  }
  onSubmit(){
    console.log(this.selectedFile);
    if(this.selectedFile === undefined){
      console.log('Image not present');
      alert('Please provide an image');
      return;
    }
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

    console.log(this.signupRequestPayload);
    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.ngOnInit();
        if(data === "User Registered Successfully"){
          this.uploadUserImage();
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
