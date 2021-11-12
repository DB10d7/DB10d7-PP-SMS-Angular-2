import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  singleUser: any;
  userName: String;
  constructor(public authService:AuthService ,private route: ActivatedRoute, private router: Router) {
    this.userName = this.authService.getUserName();
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe( result => {
      this.singleUser= result;
      console.log(this.singleUser);
    });
  }
  viewDayListByTopic(name: String){
    console.log(name);
    this.router.navigate(['dayListByTopic/', name]);
  }
}
