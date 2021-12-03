import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-unverified-user',
  templateUrl: './unverified-user.component.html',
  styleUrls: ['./unverified-user.component.css']
})
export class UnverifiedUserComponent implements OnInit {
  listUVUsers:any;
  searchText: string="";
  unVerifiedUserId: Number=0;
  constructor(public authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.getUnverifiedUserList().subscribe(data =>{
        this.listUVUsers=data;
    }, error =>{
      alert("hello");
    })
  }
  recordId(id: Number){
    this.unVerifiedUserId= id;
  }
  deleteUnverifiedUser(id:Number){
    this.authService.deleteUser(id).subscribe(data =>{
      // alert(data);
      // this.ngOnInit();
      window.location.reload();
    }, error =>{
      alert("Srry");
    });
  }
}
