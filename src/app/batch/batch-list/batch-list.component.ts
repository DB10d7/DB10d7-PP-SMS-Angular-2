import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service';


@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {

  constructor(private batchService: BatchService,private route: ActivatedRoute, private router: Router) { }
  listBatch:any;
  ngOnInit(): void {
    this.batchService.getBatchList().subscribe((resp)=>{

      this.listBatch = resp;
      console.log(this.listBatch);
      })
  }
  viewBatch(name: String){
    this.router.navigate(['singleBatch/',name]);
  }
  viewDayList(name: String){
    this.router.navigate(['dayListByBatch/',name]);
    console.log(name);
  }
  viewStudentList(name: String){
    this.router.navigate(['studentListByBatch/',name]);
    console.log(name);
  }

}
