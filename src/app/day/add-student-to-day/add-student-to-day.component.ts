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
  batchDayRequest:any;
  constructor(private dayService: DayService,private studentService: StudentService,private route: ActivatedRoute, private router: Router) { 
    this.addStudentToDayRequest = {
      studentName : '',
      dayName:'',
    };
    this.batchDayRequest = {
      batchName : '',
      dayName : ''
    }
  }

  ngOnInit(): void {
    this.listStudent = [];
    console.log("helloOnit");
    this.viewDayToAddStudent();
    
    
  }
  viewDayToAddStudent(){
    this.dayService.viewDay(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log("data is here",result);
      this.singleDay= result;
      this.batchDayRequest.batchName= this.singleDay.batchName;
      this.batchDayRequest.dayName= this.singleDay.dayName;
      console.log("helloViewDay");
      this.studentListByBatch();
    })
  }
  studentListByBatch(){
    console.log("helloStudentList");
      this.dayService.studentListByBatchNotPresent(this.batchDayRequest).subscribe((resp)=>{

        this.listStudent = resp;
        console.log(resp);
      })
  }
  addStudent(name: String){
    console.log("helloAddStudent");
    this.addStudentToDayRequest.dayName=this.singleDay.dayName;
    this.addStudentToDayRequest.studentName=name;
    console.log(this.addStudentToDayRequest);
    this.dayService.addStudentToDay(this.addStudentToDayRequest )
      .subscribe(data => {
        this.studentListByBatch();
      }, error => {
        console.log(error);
      });
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
    console.log(name);
  }
}
