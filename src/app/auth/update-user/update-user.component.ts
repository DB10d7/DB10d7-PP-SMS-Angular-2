import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdateRequestPayload } from './update-user-request.payload';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  

  userUpdateRequestPayload : UserUpdateRequestPayload;
  userUpdateForm : any= FormGroup;

  constructor(private authService:AuthService, private router:Router,private route: ActivatedRoute) {
    
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
    this.authService.getSingleUser(this.route.snapshot.params['name']).subscribe((result:any)=>{
      console.log(result);
      this.userUpdateForm = new FormGroup ({
        username: new FormControl(result['username']),
        name: new FormControl(result['name']),
        password: new FormControl(result['password']),
        email: new FormControl(result['email']),
        batch: new FormControl(result['batch']),
        role: new FormControl(result['role']) 
       });
   });
   
  }
  onSubmit(){
    this.userUpdateRequestPayload.username = this.userUpdateForm.get('username').value;
    this.userUpdateRequestPayload.name = this.userUpdateForm.get('name').value;
    this.userUpdateRequestPayload.email = this.userUpdateForm.get('email').value;
    this.userUpdateRequestPayload.password = this.userUpdateForm.get('password').value;
    this.userUpdateRequestPayload.batch = this.userUpdateForm.get('batch').value;
    this.userUpdateRequestPayload.role = this.userUpdateForm.get('role').value;


    console.warn(this.userUpdateRequestPayload);
    this.authService.updateUser(this.route.snapshot.params['name'],this.userUpdateRequestPayload).subscribe((data)=>{
      console.warn("data is here",data);
      alert("User Updated Successfully");
      this.router.navigate(['batchList']);
    })
  }
}
