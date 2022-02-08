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
  setDay: Set<string>= new Set();
  jobsAppliedList: any;
  numberOfJobs: number=0;
  studentApi: any;
  practicePercent: number=0;
  totalCompletion: number=0;
  practiceTopics: any;
  practiceTrack!:any
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
      for(var i=0;i<this.listDayByStudent.length;i++){
        this.setDay.add(this.listDayByStudent[i].dayName);
      }
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
      if(this.listDayByStudent.length != 0){
        this.userAttendance = ((this.listDayByStudent.length *100)/this.listDayByBatch.length);
      }
      
      // if(this.userAttendance === NaN){
      //   this.userAttendance = 0
      // }
      console.log(this.userAttendance);
      this.viewJobDetails();
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
  viewJobDetails(){
    this.studentService.viewJobListByStudent(this.singleStudent.email).subscribe((result)=>{
      var list=result;
      console.log(list);
      this.jobsAppliedList=list.myjobs;
      console.log(this.jobsAppliedList);
      if(this.jobsAppliedList.length){
        this.numberOfJobs = this.jobsAppliedList.length;
      }
      this.viewPracticeDetails();
    },(err)=>{
      console.log(err);
      this.viewPracticeDetails();
    })
  }
  viewPracticeDetails(){
    var batch = this.singleStudent.batch;
    console.log(batch);
    console.log(batch.length);
    var search='';
    for(var i=0;i<batch.length;i++){
      
      if(batch[i]>='A' && batch[i]<='Z'){
        search+=batch[i].toLowerCase();
        console.log(batch[i]);
      }else if(batch[i]>='0' && batch[i]<='9'){
        search+=batch[i];
        console.log(batch[i]);
      }
    }
    console.log(search);
    this.studentService.viewPracticeByStudent(search).subscribe((result)=>{
      var list = result;
      console.log(list);
      for(var i=0;i<list.length;i++){
        if((''+list[i].id) === this.singleStudent.username){
          var student = list[i];
          console.log(student.practice_percent.percentage);
          if(student.practice_percent){
            this.practicePercent = student.practice_percent.percentage;
          }
          this.totalCompletion = (this.practicePercent + this.userAttendance)/2;
          console.log(this.practicePercent);
          console.log(student);
          this.practiceTrack = student.practice_track;
          console.log(this.practiceTrack);
          this.practiceTopics = Object.keys;
          // console.log(this.practiceTopics[4]);
        }
      }
    })
  }
}
