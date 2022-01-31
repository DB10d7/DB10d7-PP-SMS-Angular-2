import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DayService } from '../day.service';

@Component({
  selector: 'app-day-list-by-student',
  templateUrl: './day-list-by-student.component.html',
  styleUrls: ['./day-list-by-student.component.css']
})
export class DayListByStudentComponent implements OnInit {
  listDay: any;
  setDay: Set<string>= new Set();
  listTotalDay: any;
  studentName: String="";
  constructor(private dayService: DayService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewDayList();
  }
  viewDayListByBatch(name: string){
    this.dayService.getDayListByBatch(name).subscribe((res)=>{
      this.listTotalDay= res;
    })
  }
  viewDayList(){
    this.studentName= this.route.snapshot.params['name'];
    this.dayService.getDayListByStudent(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.listDay= result;
      for(var i=0;i<this.listDay.length;i++){
        this.setDay.add(this.listDay[0].dayName);
      }
      console.log(this.listDay);
      console.log(this.setDay);
      console.log(this.listDay[0].batchName);
      this.viewDayListByBatch(this.listDay[0].batchName);
    })
  }
}
