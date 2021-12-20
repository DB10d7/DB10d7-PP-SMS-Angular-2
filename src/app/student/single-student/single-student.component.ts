import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
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
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  constructor(private studentService:StudentService, private authService : AuthService,public dayService: DayService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewStudent();
  }
  viewStudent(){
    this.studentService.viewStudent(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log("data is here",result);
      this.singleStudent= result;
      console.log(this.singleStudent);
      this.getImage();
      this.viewDayListByStudent();
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
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.authService.getUserImage(this.singleStudent.username)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrieveResonse);
        }
      );
  }
}
