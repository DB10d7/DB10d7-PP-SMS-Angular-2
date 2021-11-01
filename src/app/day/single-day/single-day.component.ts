import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DayService } from '../day.service';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css']
})
export class SingleDayComponent implements OnInit {
  singleDay:any;
  constructor(private dayService: DayService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewDay();
  }
  viewDay(){
    this.dayService.viewDay(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log("data is here",result);
      this.singleDay= result;
      console.log(this.singleDay);
    })
  }
  viewDayToAddStudent(name: String){
    this.router.navigate(['addStudentToDay/', name]);
    console.log(name);
  }
}
