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
  isValid: boolean= true;
  constructor(private authService:AuthService,private httpClient: HttpClient, private router:Router,private toastr: ToastrService) {
    this.signupForm = {
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    // this.signupRequestPayload = {
    //   username: '',
    //   name:'',
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
      
    // };
    this.signupRequestPayload = {
      username: '',
      name:'',
      email: '',
      password: '',
      confirmPassword: '',
      
      city: '',
      surname: '',
      state: '',
      tenthMarks: '',
      twelfthMarks: '',
      graduationMarks: '',
      number: '',
      birthDate: '',
      yearOfPassing: '',
      gender: '',
      collegeName: '',
      university: ''
    };
   }
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      yearOfPassing: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      tenthMarks: new FormControl('', Validators.required),
      graduationMarks: new FormControl('', Validators.required),
      twelfthMarks: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      collegeName: new FormControl('', Validators.required),
      university: new FormControl('', Validators.required),
    });
    console.log(this.signupForm.get('username').value);
  }
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    console.log(this.selectedFile.picByte);
    console.log(this.selectedFile.size);
    if(this.selectedFile.size >= 200000){
      alert('Please reduce the image size to 200 KB')
      window.location.reload();
    }
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
    console.log("hello")
    console.log(this.selectedFile);
    if(this.selectedFile === undefined){
      console.log('Image not present');
      alert('Please provide an image');
      this.isValid = false;
      return ;
    }
    if(this.selectedFile.size >= 200000){
      alert('Please reduce the image size to 200 KB')
      this.isValid = false;
      return;
    }
    if((this.signupForm.get('password').value === '' || this.signupForm.get('confirmPassword').value === '') || (this.signupForm.get('password').value.length<8 || this.signupForm.get('confirmPassword').value.length<8)){
      console.log('register failed');
      alert("Password's Has To Be 8 Characters Long");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('password').value !== this.signupForm.get('confirmPassword').value){
      console.log('register failed');
      alert("Password's Do Not Match");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('username').value === '' || this.signupForm.get('username').value.length < 8 ){
      alert("UserName Has To Be 8 Characters Long");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('number').value === '' || this.signupForm.get('number').value.length < 10){
      alert("Please provide a valid mobile number");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('name').value === '' || this.signupForm.get('name').value.length < 3 ){
      alert("Name Has To Be 8 Characters Long");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('surname').value === '' || this.signupForm.get('surname').value.length < 3 ){
      alert("Surname Has To Be 8 Characters Long");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('gender').value === ''){
      alert("Please provide your City Name");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('yearOfPassing').value === ''){
      alert("Please provide your City Name");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('state').value === ''){
      alert("Please provide your State Name");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('birthDate').value === ''){
      alert("Please provide your Date of Birth");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('collegeName').value === ''){
      alert("Please provide your College Name");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('university').value === ''){
      alert("Please provide your University Name");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('graduationMarks').value === '' || this.signupForm.get('graduationMarks').value.length < 2){
      alert("Please provide your Graduation Marks");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('tenthMarks').value === '' || this.signupForm.get('tenthMarks').value.length < 2){
      alert("Please provide your Graduation Marks");
      this.isValid = false;
      return;
    }
    if(this.signupForm.get('twelfthMarks').value === '' || this.signupForm.get('twelfthMarks').value.length < 2){
      alert("Please provide your Graduation Marks");
      this.isValid = false;
      return;
    }
    // this.isValidForm();
    // if(this.isValid == false){
    //   return;
    // }
    // if(this.selectedFile === undefined){
    //   console.log('Image not present');
    //   alert('Please provide an image');
    //   return;
    // }
    // if(this.selectedFile.size >= 200000){
    //   alert('Please reduce the image size to 200 KB')
    //   return;
    // }
    // if((this.signupForm.get('password').value === '' || this.signupForm.get('confirmPassword').value === '') || (this.signupForm.get('password').value.length<8 || this.signupForm.get('confirmPassword').value.length<8)){
    //   console.log('register failed');
    //   alert("Password's Has To Be 8 Characters Long");
      
    //   return;
    // }
    // if(this.signupForm.get('password').value !== this.signupForm.get('confirmPassword').value){
    //   console.log('register failed');
    //   alert("Password's Do Not Match");
      
    //   return;
    // }
    // if(this.signupForm.get('username').value === '' || this.signupForm.get('username').value.length < 8 ){
    //   alert("UserName Has To Be 8 Characters Long");
      
    //   return;
    // }
    // if(this.signupForm.get('name').value === '' || this.signupForm.get('name').value.length < 8 ){
    //   alert("Name Has To Be 8 Characters Long");
      
    //   return;
    // }
    // this.signupRequestPayload.username = this.signupForm.get('username').value;
    // this.signupRequestPayload.name = this.signupForm.get('name').value;
    // this.signupRequestPayload.email = this.signupForm.get('email').value;
    // this.signupRequestPayload.password = this.signupForm.get('password').value;
    // this.signupRequestPayload.confirmPassword = this.signupForm.get('confirmPassword').value;

    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.name = this.signupForm.get('name').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.confirmPassword = this.signupForm.get('confirmPassword').value;
    
    this.signupRequestPayload.surname = this.signupForm.get('surname').value;
    this.signupRequestPayload.city = this.signupForm.get('city').value;
    this.signupRequestPayload.state = this.signupForm.get('state').value;
    this.signupRequestPayload.graduationMarks = this.signupForm.get('graduationMarks').value;
    this.signupRequestPayload.tenthMarks = this.signupForm.get('tenthMarks').value;
    this.signupRequestPayload.twelfthMarks = this.signupForm.get('twelfthMarks').value;
    this.signupRequestPayload.number = this.signupForm.get('number').value;
    this.signupRequestPayload.gender = this.signupForm.get('gender').value;
    this.signupRequestPayload.yearOfPassing = this.signupForm.get('yearOfPassing').value;
    this.signupRequestPayload.birthDate = this.signupForm.get('birthDate').value;
    this.signupRequestPayload.collegeName = this.signupForm.get('collegeName').value;
    this.signupRequestPayload.university = this.signupForm.get('university').value;

    console.log(this.signupRequestPayload);
    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.ngOnInit();
        if(data === "User Registered Successfully"){
          this.uploadUserImage();
        }else{
          alert(data);
          
        }
        
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }
   isValidForm(){
    
  }
}
