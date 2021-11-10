import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: String;
  constructor(public authService:AuthService ,private route: ActivatedRoute, private router: Router) {
    this.userName=''
  }

  ngOnInit(): void {
    this.userName= this.authService.getUserName();
  }
  viewTopic(name: String){
    console.log(name);
    this.router.navigate(['dayListByTopic/', name]);
  }
  viewDayListByStudent(name: String){
    this.router.navigate(['dayListByStudent/', name]);
  }
  viewDefaultRoleUserList(){
    this.router.navigate(['defaultRoleUserList']);
  }
  viewUserList(){
    this.router.navigate(['userList']);
  }
  viewBatchList(){
    this.router.navigate(['batchList']);
  }
}
