import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { BatchService } from 'src/app/batch/batch.service';
import { UserUpdateRequestPayload } from '../update-user/update-user-request.payload';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  userUpdateRequestPayload : UserUpdateRequestPayload;
  userUpdateForm : any= FormGroup;
  listBatch:any;
  updateImageData: any= FormGroup;
  selectedFile: any;
  message: string="";
  username: string="";
  retrieveResonse: any;
  uploadImageData: any= FormData;
  constructor(public authService:AuthService,private httpClient: HttpClient,private batchService: BatchService, private router:Router,private route: ActivatedRoute) {
    this.userUpdateRequestPayload = {
      username: '',
      name: '',
  
      email: '',
      batch: '',
      role: ''
    } 
  }
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    console.log(this.selectedFile.size);
  }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((result:any)=>{
      console.log(result);
      this.userUpdateForm = new FormGroup ({
        username: new FormControl(result['username']),
        name: new FormControl(result['name']),
        
        email: new FormControl(result['email']),
        batch: new FormControl(result['batch']),
        role: new FormControl(result['role']) 
       });
       this.username=this.userUpdateForm.get('username').value;
      //  this.getImage();
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
    
    this.httpClient.post('http://localhost:8080/api/user/image/update', this.uploadImageData, { responseType: 'text' })
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
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.authService.getUserImage(this.username)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.selectedFile= this.retrieveResonse;
          // this.base64Data = this.retrieveResonse.picByte;
          // this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.selectedFile);
          // alert("Image Retrieved Successfully")
        }
      );
  }
  onSubmit(){
    this.userUpdateRequestPayload.username = this.userUpdateForm.get('username').value;
    this.userUpdateRequestPayload.name = this.userUpdateForm.get('name').value;
    this.userUpdateRequestPayload.email = this.userUpdateForm.get('email').value;
    // this.userUpdateRequestPayload.password = this.userUpdateForm.get('password').value;
    this.userUpdateRequestPayload.batch = this.userUpdateForm.get('batch').value;
    this.userUpdateRequestPayload.role = this.userUpdateForm.get('role').value;


    console.warn(this.userUpdateRequestPayload);
    this.authService.updateUserProfile(this.userUpdateRequestPayload).subscribe((data)=>{
      console.warn("data is here",data);
      // alert("User Updated Successfully");
      
      this.uploadUserImage();
    })
  }
}
