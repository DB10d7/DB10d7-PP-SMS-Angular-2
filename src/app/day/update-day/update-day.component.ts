import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateDayRequestPayload } from '../create-day/create-day-request.payload';
import { DayService } from '../day.service';

@Component({
  selector: 'app-update-day',
  templateUrl: './update-day.component.html',
  styleUrls: ['./update-day.component.css']
})
export class UpdateDayComponent implements OnInit {

  updateDayRequest: any= CreateDayRequestPayload;
  updateDayForm: any= FormGroup;

  constructor(private router:Router,private route: ActivatedRoute, private dayService: DayService) {
    this.updateDayRequest = {
      batchName:'',
      dayName:'',
      url:'',
      description:'',
      createdBy:'',
    }
   }

  ngOnInit(): void {
    this.dayService.viewDay(this.route.snapshot.params['name']).subscribe((result:any)=>{
      console.log(result);
      this.updateDayForm = new FormGroup ({
        batchName: new FormControl(result['batchName']),
        dayName: new FormControl(result['dayName']),
        url: new FormControl(result['url']),
        description: new FormControl(result['description']),
        createdBy: new FormControl(result['createdBy']), 
       });
   });
  }
 onSubmit(){
   this.updateDayRequest.batchName= this.updateDayForm.get('batchName').value;
   this.updateDayRequest.dayName= this.updateDayForm.get('dayName').value;
   this.updateDayRequest.description= this.updateDayForm.get('description').value;
   this.updateDayRequest.url= this.updateDayForm.get('url').value;
   this.updateDayRequest.createdBy= this.updateDayForm.get('createdBy').value;

   this.dayService.updateDay(this.route.snapshot.params['name'],this.updateDayRequest).subscribe((data)=>{
    console.warn("data is here",data);
    alert("Day Updated Successfully");
    this.router.navigate(['dayListByBatch/',this.updateDayRequest.batchName]);
  }, error => {
    console.log(error);
    
  })
 }
}
