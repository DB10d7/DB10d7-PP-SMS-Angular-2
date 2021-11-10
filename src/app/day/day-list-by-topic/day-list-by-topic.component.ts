import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { DayService } from '../day.service';

@Component({
  selector: 'app-day-list-by-topic',
  templateUrl: './day-list-by-topic.component.html',
  styleUrls: ['./day-list-by-topic.component.css']
})
export class DayListByTopicComponent implements OnInit {
  listDay:any;
  batchName:string="";
  topicName: String;
  singleUser:any;
  listDayByStudent: Set<string> = new Set<string>() ;
  constructor(private dayService: DayService,private authService: AuthService,private route: ActivatedRoute, private router: Router) {
    this.topicName = ''
   }

  ngOnInit(): void {
    this.topicName = this.route.snapshot.params['name'];
    this.getSingleUser();
    
  }
  viewDayList(){
    this.dayService.getDayListByBatch(this.singleUser.batch).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.batchName=this.singleUser.batch;
      
      this.listDay= result;
      console.log(this.listDay);
      //console.log(this.listDayByStudent);
    })  
  }
  viewDayListByStudent(){
    this.dayService.getDayListByStudent(this.singleUser.username).subscribe((result)=>{
      console.log(this.singleUser.username);
      console.log("data is here",result);
     // this.listDayByStudent= result;
     for (var i = 0; i < result.length; i++){
      // console.log("<br><br>array index: " + i);
      var obj = result[i];
      for (var key in obj){
        if(key==='dayName'){
          this.listDayByStudent.add(obj[key]);
        }
        // console.log("<br> - " + key + ": " + obj[key]);
        
      }
    }
      console.log('hello');
      console.log(this.listDayByStudent);
    })
  }
  getSingleUser(){
    this.authService.getCurrentUser().subscribe((result)=>{
      console.log("data is here",result);
      this.singleUser= result;
      console.log(this.singleUser);
      this.viewDayList();
      this.viewDayListByStudent();
    })
  }
}
