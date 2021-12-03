import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService } from 'src/app/day/day.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  singleUser: any;
  listDayByStudent:any;
  listDayByBatch:any;
  userAttendance: number=0;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  constructor(public authService:AuthService,private dayService:DayService ,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((result:any)=>{
      this.singleUser=result;
      console.log(this.singleUser);
      this.getImage();
      if(this.authService.getUserRole() === 'STUDENT'){
        this.viewDayListByStudent();
      }
      
    });
  }
  viewDayListByStudent(){
    this.dayService.getDayListByStudent(this.singleUser.username).subscribe((result)=>{
      console.log(this.singleUser.username);
      console.log("data is here",result);
      this.listDayByStudent= result;
      console.log(this.listDayByStudent);
      this.viewDayListByBatch();
    })
  }
  viewDayListByBatch(){
    this.dayService.getDayListByBatch(this.singleUser.batch).subscribe((result)=>{
      console.log(this.singleUser.batch);
      console.log("data is here",result);
      this.listDayByBatch= result;
      console.log(this.listDayByBatch);
      console.log(this.listDayByStudent.length)
      this.userAttendance = ((this.listDayByStudent.length *100)/this.listDayByBatch.length);
      console.log(this.userAttendance);
    })
  }
  updateProfile(){
    this.router.navigate(['updateProfile']);
  }
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.authService.getUserImage(this.singleUser.username)
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
