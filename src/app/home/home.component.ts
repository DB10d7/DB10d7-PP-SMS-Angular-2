import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  viewDayListByStudent(name: String){
    this.router.navigate(['dayListByStudent/', name]);
  }
  viewDefaultRoleUserList(){
    this.router.navigate(['defaultRoleUserList']);
  }
  viewUserList(){
    this.router.navigate(['userList']);
  }
  viewDayList(){
    this.router.navigate(['dayList']);
  }
  viewBatchList(){
    this.router.navigate(['batchList']);
  }
  viewStudentList(){
    this.router.navigate(['studentList']);
  }
  viewEmployeeList(){
    this.router.navigate(['employeeList']);
  }
  viewStudentPage(){
    this.router.navigate(['studentHome'])
  }
  viewDayListByBatch(name: String){
    this.router.navigate(['dayListByBatch/', name]);
  }
  loginPage(){
    this.router.navigate(['login']);
  }
  registerPage(){
    this.router.navigate(['sign-up']);
  }
}
