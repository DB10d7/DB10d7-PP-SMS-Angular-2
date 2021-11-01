import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-single-batch',
  templateUrl: './single-batch.component.html',
  styleUrls: ['./single-batch.component.css']
})
export class SingleBatchComponent implements OnInit {
  singleBatch:any;
  constructor(private batchService:BatchService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewBatch();
  }
  viewBatch(){
    this.batchService.viewBatch(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log("data is here",result);
      this.singleBatch= result;
      console.log(this.singleBatch);
    })
  }

}
