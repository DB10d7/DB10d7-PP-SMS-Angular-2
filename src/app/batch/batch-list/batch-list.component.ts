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
      })
  }
  viewBatch(name: String){
    this.router.navigate(['singleBatch/',name]);
  }
  viewDay(name: String){
    this.router.navigate(['dayListByBatch',name]);
  }

}
