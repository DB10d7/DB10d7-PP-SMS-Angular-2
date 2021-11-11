import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  singleUser: any;
  constructor(public authService:AuthService, private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((result:any)=>{
      console.log(result);
      this.singleUser=result;
      console.log(this.singleUser);
    });
  }

}
