import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DayService } from '../day.service';

@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.css']
})
export class DayListComponent implements OnInit {
  searchText: string="";
  listDay:any;
  constructor(private dayService: DayService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dayService.getDayList().subscribe((resp)=>{

      this.listDay = resp;
      })
  }

}
