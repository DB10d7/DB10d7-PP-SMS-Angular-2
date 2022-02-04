import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { BatchService } from 'src/app/batch/batch.service';
import { UserUpdateRequestPayload } from '../update-user/update-user-request.payload';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  userUpdateRequestPayload : UserUpdateRequestPayload;
  userUpdateForm : any= FormGroup;
  singleUser : any;
  listBatch:any;
  updateImageData: any= FormGroup;
  selectedFile: any;
  message: string="";
  username: string="";
  uploadImageData: any= FormData;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  host:string=environment.apiUrl;
  constructor(public authService:AuthService,private httpClient: HttpClient,private batchService: BatchService, private router:Router,private route: ActivatedRoute) {
    this.userUpdateRequestPayload = {
      username: '',
      uname:'',
      name: '',
      email: '',
      batch: '',
      role: '',

      city: '',
      surname: '',
      state: '',
      tenthMarks: '',
      twelfthMarks: '',
      graduationMarks: '',
      number: '',
      birthDate: new Date(),
      yearOfPassing: '',
      gender: '',
      collegeName: '',
      university: '',
      status: '',
      graduation: '',
      graduationBranch: ''
    } 
  }
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    console.log(this.selectedFile.size);
    if(this.selectedFile.size >= 300000){
      alert('Please reduce the image size to 300 KB')
      window.location.reload();
    }
  }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((result:any)=>{
      console.log(result);
      this.singleUser = result;
      this.getImage();
      this.userUpdateForm = new FormGroup ({
        username: new FormControl(result['username']),
        uname: new FormControl(result['uname']),
        name: new FormControl(result['name']),       
        email: new FormControl(result['email']),
        batch: new FormControl(result['batch']),
        role: new FormControl(result['role']),

        surname: new FormControl(result['surname']),
        birthDate: new FormControl(result['birthDate']),
        yearOfPassing: new FormControl(result['yearOfPassing']),
        city: new FormControl(result['city']),
        state: new FormControl(result['state']),
        tenthMarks: new FormControl(result['tenthMarks']),
        graduationMarks: new FormControl(result['graduationMarks']),
        twelfthMarks: new FormControl(result['twelfthMarks']),
        gender: new FormControl(result['gender']),
        number: new FormControl(result['number']),
        collegeName: new FormControl(result['collegeName']),
        university: new FormControl(result['university']),
        status: new FormControl(result['status']),
        graduation: new FormControl(result['graduation']),
        graduationBranch: new FormControl(result['graduationBranch'])
       });
       this.username = this.userUpdateForm.get('username').value;
       if(this.authService.getUserRole() === 'SUPER-ADMIN'){
        this.viewBatchList();
       }
       
    });
  }
  
  viewBatchList(){
    this.batchService.getBatchList().subscribe((resp)=>{

      this.listBatch = resp;
      console.log(this.listBatch);
      })
  }
  uploadUserImage(){
    console.log(this.selectedFile);
    if(this.selectedFile == undefined){
      alert('Image Not Updated');
      alert('User Updated Successfully');
      this.router.navigate(['userProfile']);
    }
    this.uploadImageData = new FormData();
    this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.uploadImageData.append('username', this.username)
    console.log(this.uploadImageData.get('imageFile').value);
    console.log(this.uploadImageData.get('username').value);
    
    this.httpClient.post(this.host+'api/user/image/update', this.uploadImageData, { responseType: 'text' })
      .subscribe((response) => {
        console.log(response);
        if (response === "Image Updated") {
          this.message = 'Image updated successfully';
          alert(this.message);
          alert("User Updated Successfully");
          this.router.navigate(['userProfile']);
        } else {
          this.message = 'Image not uploaded successfully';
          alert(this.message);
        }
        
      }, error =>{
          alert('Please reduce the image size to 60 kb')
      }
      );
  }
  getImage() {
    this.authService.getUserImage(this.singleUser.username)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrieveResonse);
        }
      );
  }
  onSubmit(){

    if(this.userUpdateForm.get('number').value === '' || this.userUpdateForm.get('number').value.length < 10){
      alert("Please provide a valid mobile number");
      
      return;
    }
    if(this.userUpdateForm.get('name').value === '' || this.userUpdateForm.get('name').value.length < 3 ){
      alert("Name Has To Be 8 Characters Long");
      
      return;
    }
    if(this.userUpdateForm.get('surname').value === '' || this.userUpdateForm.get('surname').value.length < 3 ){
      alert("Surname Has To Be 8 Characters Long");
      
      return;
    }
    if(this.userUpdateForm.get('gender').value === ''){
      alert("Please provide your City Name");
      
      return;
    }
    if(this.userUpdateForm.get('yearOfPassing').value === ''){
      alert("Please provide your City Name");
      
      return;
    }
    if(this.userUpdateForm.get('state').value === ''){
      alert("Please provide your State Name");
      
      return;
    }
    if(this.userUpdateForm.get('birthDate').value === ''){
      alert("Please provide your Date of Birth");
      
      return;
    }
    if(this.userUpdateForm.get('collegeName').value === ''){
      alert("Please provide your College Name");
      
      return;
    }
    if(this.userUpdateForm.get('university').value === ''){
      alert("Please provide your University Name");
      
      return;
    }
    if(this.userUpdateForm.get('graduation').value === ''){
      alert("Please provide your Graduation Course");
      
      return;
    }
    if(this.userUpdateForm.get('graduationBranch').value === ''){
      alert("Please provide your Graduation Branch");
      
      return;
    }
    if(this.userUpdateForm.get('graduationMarks').value === '' || this.userUpdateForm.get('graduationMarks').value.length < 2){
      alert("Please provide your Graduation Marks");
      
      return;
    }
    if(this.userUpdateForm.get('tenthMarks').value === '' || this.userUpdateForm.get('tenthMarks').value.length < 2){
      alert("Please provide your Graduation Marks");
      
      return;
    }
    if(this.userUpdateForm.get('twelfthMarks').value === '' || this.userUpdateForm.get('twelfthMarks').value.length < 2){
      alert("Please provide your Graduation Marks");
      
      return;
    }

    this.userUpdateRequestPayload.username = this.userUpdateForm.get('username').value;
    this.userUpdateRequestPayload.name = this.userUpdateForm.get('name').value;
    this.userUpdateRequestPayload.uname = this.userUpdateForm.get('uname').value;
    this.userUpdateRequestPayload.email = this.userUpdateForm.get('email').value;
    this.userUpdateRequestPayload.batch = this.userUpdateForm.get('batch').value;
    this.userUpdateRequestPayload.role = this.userUpdateForm.get('role').value;

    this.userUpdateRequestPayload.surname = this.userUpdateForm.get('surname').value;
    this.userUpdateRequestPayload.city = this.userUpdateForm.get('city').value;
    this.userUpdateRequestPayload.state = this.userUpdateForm.get('state').value;
    this.userUpdateRequestPayload.graduationMarks = this.userUpdateForm.get('graduationMarks').value;
    this.userUpdateRequestPayload.tenthMarks = this.userUpdateForm.get('tenthMarks').value;
    this.userUpdateRequestPayload.twelfthMarks = this.userUpdateForm.get('twelfthMarks').value;
    this.userUpdateRequestPayload.number = this.userUpdateForm.get('number').value;
    this.userUpdateRequestPayload.gender = this.userUpdateForm.get('gender').value;
    this.userUpdateRequestPayload.yearOfPassing = this.userUpdateForm.get('yearOfPassing').value;
    this.userUpdateRequestPayload.birthDate = this.userUpdateForm.get('birthDate').value;
    this.userUpdateRequestPayload.collegeName = this.userUpdateForm.get('collegeName').value;
    this.userUpdateRequestPayload.university = this.userUpdateForm.get('university').value;
    this.userUpdateRequestPayload.status = this.userUpdateForm.get('status').value;
    this.userUpdateRequestPayload.graduation = this.userUpdateForm.get('graduation').value;
    this.userUpdateRequestPayload.graduationBranch = this.userUpdateForm.get('graduationBranch').value;

    console.warn(this.userUpdateRequestPayload);
    this.authService.updateUserProfile(this.userUpdateRequestPayload, this.username ).subscribe((data)=>{
      console.warn("data is here",data);
      this.uploadUserImage();
    })
  }
}
