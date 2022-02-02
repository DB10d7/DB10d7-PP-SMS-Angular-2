import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
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
  trainerList: any;
  constructor(private router: Router, private dayService: DayService, private route: ActivatedRoute,private authService: AuthService ) {

    this.createDayRequest = {
      batchName:'',
      dayName:'',
      description:'',
      url:'',
      createdBy:'',
      topic:'',
      sessionName:''
    }
  }

  ngOnInit(): void {

    this.authService.getTrainersList().subscribe(data =>{
      this.trainerList=data;
    })
    this.createDayForm = new FormGroup({
      batchName: new FormControl(this.route.snapshot.params['name'],Validators.required),
      
      description: new FormControl('', Validators.required),
      url: new FormControl('',Validators.required),
      createdBy: new FormControl('', Validators.required),
      topic: new FormControl('', Validators.required),
      sessionName: new FormControl('', Validators.required),
    })
  }

  onSubmit(){

    

    this.createDayRequest.batchName= this.createDayForm.get('batchName').value;
    this.createDayRequest.dayName= this.createDayForm.get('batchName').value +"-"+ this.createDayForm.get('sessionName').value;
    this.createDayRequest.description= this.createDayForm.get('description').value;
    this.createDayRequest.url= this.createDayForm.get('url').value;
    this.createDayRequest.createdBy= this.createDayForm.get('createdBy').value;
    this.createDayRequest.topic= this.createDayForm.get('topic').value;
    this.createDayRequest.sessionName= this.createDayForm.get('sessionName').value;

    this.dayService.createDay(this.createDayRequest)
      .subscribe((data: String) => {
        this.ngOnInit();
        if(data === "Day Successfully Created"){
          alert(data);
          this.router.navigate(['dayListByBatch/',this.route.snapshot.params['name']],
         { queryParams: { registered: 'true' } });
        }else{
          alert(data);
          this.ngOnInit();
          console.log(data);
        }
        
        console.log(data);
      }, error => {
        console.log(error);
        
      });

  }

}
