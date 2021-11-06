import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService } from '../day.service';
import { CreateDayRequestPayload } from './create-day-request.payload';

@Component({
  selector: 'app-create-day',
  templateUrl: './create-day.component.html',
  styleUrls: ['./create-day.component.css']
})
export class CreateDayComponent implements OnInit {

  createDayRequest: CreateDayRequestPayload;
  createDayForm: any;

  constructor(private router: Router, private dayService: DayService, private route: ActivatedRoute ) {

    this.createDayRequest = {
      batchName:'',
      dayName:'',
      description:'',
      url:'',
      createdBy:''
    }
  }

  ngOnInit(): void {
    this.createDayForm = new FormGroup({
      batchName: new FormControl(this.route.snapshot.params['name'],Validators.required),
      dayName: new FormControl('',Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('',Validators.required),
      createdBy: new FormControl('', Validators.required) 
    })
  }

  onSubmit(){

    this.createDayRequest.batchName= this.createDayForm.get('batchName').value;
    this.createDayRequest.dayName= this.createDayForm.get('dayName').value;
    this.createDayRequest.description= this.createDayForm.get('description').value;
    this.createDayRequest.url= this.createDayForm.get('url').value;
    this.createDayRequest.createdBy= this.createDayForm.get('createdBy').value;

    this.dayService.createDay(this.createDayRequest)
      .subscribe(data => {
        alert("Day Created Successfully");
        this.router.navigate(['dayListByBatch/',this.route.snapshot.params['name']]),
        console.log(data);
      }, error => {
        console.log(error);
        
      });

  }

}
