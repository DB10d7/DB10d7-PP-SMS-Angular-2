import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DayService } from 'src/app/day/day.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.css']
})
export class SingleStudentComponent implements OnInit {
  singleStudent:any;
  listDayByStudent:any;
  listDayByBatch:any;
  userAttendance: number=0;
  constructor(private studentService:StudentService,public dayService: DayService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewStudent();
  }
  viewStudent(){
    this.studentService.viewStudent(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log("data is here",result);
      this.singleStudent= result;
      console.log(this.singleStudent);
    })
  }
  viewDayListByStudent(){
    this.dayService.getDayListByStudent(this.singleStudent.username).subscribe((result)=>{
      console.log(this.singleStudent.username);
      console.log("data is here",result);
      this.listDayByStudent= result;
      console.log(this.listDayByStudent);
      this.viewDayListByBatch();
    })
  }
  viewDayListByBatch(){
    this.dayService.getDayListByBatch(this.singleStudent.batch).subscribe((result)=>{
      console.log(this.singleStudent.batch);
      console.log("data is here",result);
      this.listDayByBatch= result;
      console.log(this.listDayByBatch);
      console.log(this.listDayByStudent.length)
      this.userAttendance = ((this.listDayByStudent.length *100)/this.listDayByBatch.length);
      console.log(this.userAttendance);
    })
  }
}
