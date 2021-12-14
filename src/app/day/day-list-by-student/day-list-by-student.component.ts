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
  studentName: String="";
  constructor(private dayService: DayService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewDayList();
  }
  viewDayList(){
    this.studentName= this.route.snapshot.params['name'];
    this.dayService.getDayListByStudent(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.listDay= result;
      console.log(this.listDay);
    })
  }
}
