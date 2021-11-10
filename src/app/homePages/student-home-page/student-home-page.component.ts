import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {
  studentName: String;
  constructor(public authService:AuthService ,private route: ActivatedRoute, private router: Router) {
    this.studentName=''
  }

  ngOnInit(): void {
    this.studentName= this.authService.getUserName();
  }
  viewTopic(name: String){
    console.log(name);
    this.router.navigate(['dayListByTopic/', name]);
  }
}
