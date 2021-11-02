import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdateRequestPayload } from './update-user-request.payload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userUpdateRequestPayload : UserUpdateRequestPayload;
  userUpdateForm : any= FormGroup; 
  constructor(private authService:AuthService, private router:Router,private route: ActivatedRoute,private toastr: ToastrService) {
    
    this.userUpdateRequestPayload = {
      username: '',
      name: '',
      password: '',
      email: '',
      batch: '',
      role: ''
    }
  }

  ngOnInit(): void {
    this.authService.getSingleUser(this.route.snapshot.params['name']).subscribe((result)=>{
      this.userUpdateForm.patchValue({
        username: result['username'], 
        name: result['name'], 
        password: result['password'],
        email: result['email'], 
        batch: result['batch'], 
        role: result['role'],  
       });
   });
  }
  updateUser(){
    
    this.userUpdateRequestPayload.username = this.userUpdateForm.get('username').value;
    this.userUpdateRequestPayload.name = this.userUpdateForm.get('name').value;
    this.userUpdateRequestPayload.email = this.userUpdateForm.get('email').value;
    this.userUpdateRequestPayload.password = this.userUpdateForm.get('password').value;
    this.userUpdateRequestPayload.batch = this.userUpdateForm.get('batch').value;
    this.userUpdateRequestPayload.role = this.userUpdateForm.get('role').value;


    console.warn(this.userUpdateRequestPayload)
    this.authService.updateUser(this.route.snapshot.params['name'],this.userUpdateRequestPayload).subscribe((result)=>{
      console.warn("data is here",result);
      alert("User Updated Successfully");
      this.router.navigate(['batchList']);
    })
  }
}
