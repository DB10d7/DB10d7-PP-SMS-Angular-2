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
  constructor(public authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.getUnverifiedUserList().subscribe(data =>{
        this.listUVUsers=data;
    }, error =>{
      alert("hello");
    })
  }
  deleteUnverifiedUser(id:Number){
    this.authService.deleteUser(id).subscribe(data =>{
      alert(data);
      this.ngOnInit();
    }, error =>{
      alert("Srry");
    });
  }
}
