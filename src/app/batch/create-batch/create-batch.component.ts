import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { BatchService } from '../batch.service';
import { CreateBatchRequestPayload } from './create-batch-request.payload';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})
export class CreateBatchComponent implements OnInit {
  
  createBatchRequestPayload: CreateBatchRequestPayload;
  createBatchForm: any=FormGroup;
  trainerList: any;
  constructor(private router:Router,private batchService: BatchService,private authService: AuthService) {
    this.createBatchRequestPayload = {
      name:'',
      description:'',
      createdBy:''
    };
    this.createBatchForm = {
      name: '',
      description: '', 
      createdBy: ''
    };
   }

  ngOnInit(): void {

    this.authService.getTrainersList().subscribe(data =>{
      this.trainerList=data;
    })

    this.createBatchForm = new FormGroup({
      name: new FormControl('',Validators.required),
      description: new FormControl('', Validators.required),
      createdBy: new FormControl('', Validators.required) 
    })
  }
  
  onSubmit(){

    this.createBatchRequestPayload.name = this.createBatchForm.get('name').value;
    this.createBatchRequestPayload.description = this.createBatchForm.get('description').value;
    this.createBatchRequestPayload.createdBy = this.createBatchForm.get('createdBy').value;
    console.log('hello1');
    console.log(this.createBatchForm);
    this.batchService.createBatch(this.createBatchRequestPayload).subscribe(data => {
        console.log(this.createBatchRequestPayload);
        console.log('hello2');
        this.ngOnInit();
        if(data == "Batch Successfully Created"){
          alert(data);
          this.router.navigate(['/batchList']),
          console.log(data);
        }else{
          alert(data);
          this.ngOnInit();
        }
        
    }, error => {
        console.log(error);
    });
  }

}
