import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { BatchService } from '../batch.service';


@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {
  listBatch:any;
  constructor(private batchService: BatchService,public authService: AuthService,private route: ActivatedRoute, private router: Router) { }
  
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
  updateBatch(name: String){
    this.router.navigate(['updateBatch/',name]);
  }
  createBatch(){
    this.router.navigate(['createBatch']);
  }
}
