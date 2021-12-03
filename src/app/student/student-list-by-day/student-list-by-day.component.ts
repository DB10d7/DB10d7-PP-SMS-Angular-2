import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService } from 'src/app/day/day.service';
import { StudentService } from '../student.service';
import { RemoveStudentRequest } from './removeStudentFromDayRequest.payload';

@Component({
  selector: 'app-student-list-by-day',
  templateUrl: './student-list-by-day.component.html',
  styleUrls: ['./student-list-by-day.component.css']
})
export class StudentListByDayComponent implements OnInit {
  listStudent:any;
  removeStudentRequest : RemoveStudentRequest;
  studentName: String="";
  constructor(private studentService: StudentService, private dayService: DayService , private router:Router, private route: ActivatedRoute) {
    this.removeStudentRequest = {
      studentName : '',
      dayName:'',
    };
   }

  ngOnInit(): void {
    this.viewStudentList();
  }
  viewStudentList(){
    this.studentService.getStudentListByDay(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.listStudent= result;
      console.log(this.listStudent);
    })
  }
  recordId(name: String){
    this.studentName= name;
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
    console.log(name);
  }
  viewAllDays(name: String){
    this.router.navigate(['dayListByStudent/',name]);
  }
  removeStudent(studentName : String){
    this.removeStudentRequest.studentName = studentName;
    this.removeStudentRequest.dayName = this.route.snapshot.params['name'];
    this.dayService.removeStudentFromDay(this.removeStudentRequest )
      .subscribe((data: any) => {
        window.location.reload();
      }, (error : any) => {
        console.log(error);
      });
  }
}
