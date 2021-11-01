import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DayService } from '../day.service';

@Component({
  selector: 'app-day-list-by-batch',
  templateUrl: './day-list-by-batch.component.html',
  styleUrls: ['./day-list-by-batch.component.css']
})
export class DayListByBatchComponent implements OnInit {
  listDay:any;
  constructor(private dayService: DayService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewDayList();
  }
  viewDayList(){
    this.dayService.getDayListByBatch(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.listDay= result;
      console.log(this.listDay);
    })
  }
  viewStudentList(name: String){
    this.router.navigate(['studentListByBatch/',name]);
    console.log(name);
  }
}
