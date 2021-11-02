import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from '../batch.service';
import { UpdateBatchRequest } from './updateBatchRequest.payload';

@Component({
  selector: 'app-update-batch',
  templateUrl: './update-batch.component.html',
  styleUrls: ['./update-batch.component.css']
})
export class UpdateBatchComponent implements OnInit {

  updateBatchRequest :any= UpdateBatchRequest;
  updateBatchForm : any=FormGroup;

  constructor(private router:Router,private route: ActivatedRoute,private batchService: BatchService) {

    this.updateBatchRequest = {
      name:'',
      description:'',
      createdBy:'',
    }
   }

  ngOnInit(): void {
    this.batchService.viewBatch(this.route.snapshot.params['name']).subscribe((result:any)=>{
      console.log(result);
      this.updateBatchForm = new FormGroup ({
        name: new FormControl(result['name']),
        description: new FormControl(result['description']),
        createdBy: new FormControl(result['createdBy']), 
       });
   });
  }
  onSubmit(){

    this.updateBatchRequest.name= this.updateBatchForm.get('name').value;
    this.updateBatchRequest.description= this.updateBatchForm.get('description').value;
    this.updateBatchRequest.createdBy= this.updateBatchForm.get('createdBy').value;

    console.warn(this.updateBatchRequest);
    this.batchService.updateBatch(this.route.snapshot.params['name'],this.updateBatchRequest).subscribe((data)=>{
      console.warn("data is here",data);
      alert("Batch Updated Successfully");
      this.router.navigate(['batchList']);
    })
  }

}
