import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/student/student.service';
import { DayService } from '../day.service';
import { AddStudentToDayRequest } from './addStudentToDay.request.payload';

@Component({
  selector: 'app-add-student-to-day',
  templateUrl: './add-student-to-day.component.html',
  styleUrls: ['./add-student-to-day.component.css']
})
export class AddStudentToDayComponent implements OnInit {
  singleDay:any;
  listStudent:any;
  addStudentToDayRequest:any= AddStudentToDayRequest;
  constructor(private dayService: DayService,private studentService: StudentService,private route: ActivatedRoute, private router: Router) { 
    this.addStudentToDayRequest = {
      studentName : "",
      dayName:""
    };
  }

  ngOnInit(): void {
    this.viewDay();
    this.studentList();
  }
  viewDay(){
    this.dayService.viewDay(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log("data is here",result);
      this.singleDay= result;
      console.log(this.singleDay);
    })
  }
  studentList(){
    this.studentService.getStudentList().subscribe((resp)=>{

      this.listStudent = resp;
      })
  }
  addStudent(name: String){
    this.addStudentToDayRequest.studentName=this.singleDay.dayName;
    this.addStudentToDayRequest.dayName=name;
    
    this.dayService.addStudentToDay(this.addStudentToDayRequest )
      .subscribe(data => {
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
  }

}
