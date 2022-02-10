import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoveStudentRequest } from 'src/app/student/student-list-by-day/removeStudentFromDayRequest.payload';
import { StudentService } from 'src/app/student/student.service';
import { DayService } from '../day.service';
import { AddStudentToDayRequest } from './addStudentToDay.request.payload';

@Component({
  selector: 'app-add-student-to-day',
  templateUrl: './add-student-to-day.component.html',
  styleUrls: ['./add-student-to-day.component.css']
})
export class AddStudentToDayComponent implements OnInit {
  singleDay:any;
  listStudent:any;
  addStudentToDayRequest:any= AddStudentToDayRequest;
  batchDayRequest:any;
  listStudentNotPresent: any;
  setStudentNotPresent: Set<String>= new Set();
  removeStudentRequest : RemoveStudentRequest;
 
  
  constructor(private dayService: DayService,private studentService: StudentService,private route: ActivatedRoute, private router: Router) { 
    this.addStudentToDayRequest = {
      studentName : '',
      dayName:'',
    };
    this.removeStudentRequest = {
      studentName : '',
      dayName:'',
    };
    this.batchDayRequest = {
      batchName : '',
      dayName : ''
    }
  }

  ngOnInit(): void {
    this.listStudent = [];
    console.log("helloOnit");
    this.viewDayToAddStudent();
    
    
  }
  viewDayToAddStudent(){
    this.dayService.viewDay(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log("data is here",result);
      this.singleDay= result;
      this.batchDayRequest.batchName= this.singleDay.batchName;
      this.batchDayRequest.dayName= this.singleDay.dayName;
      this.studentService.getStudentListByBatch(this.singleDay.batchName).subscribe((res)=>{
        this.listStudent = res;
        
        console.log(this.listStudent);
        console.log("helloViewDay");
        this.studentListByBatchNotPresent();
      })
      
      
    })
  }
  removeStudent(studentName : String){
    this.removeStudentRequest.studentName = studentName;
    this.removeStudentRequest.dayName = this.route.snapshot.params['name'];
    
    this.setStudentNotPresent.add(studentName)
    this.dayService.removeStudentFromDay(this.removeStudentRequest )
      .subscribe((data: any) => {
        // window.location.reload();
        
        // let currentUrl = this.router.url;
        // console.log(currentUrl);
        // this.router.navigate([currentUrl]);
        // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        //     this.router.navigate([currentUrl]);
        // });
      }, (error : any) => {
        console.log(error);
      });
  }
 
  studentListByBatchNotPresent(){
    console.log("helloStudentList");
      this.dayService.studentListByBatchNotPresent(this.batchDayRequest).subscribe((resp)=>{

        this.listStudentNotPresent = resp;
        console.log(this.listStudentNotPresent);
        for(var i=0;i<this.listStudentNotPresent.length;i++){
          this.setStudentNotPresent.add(this.listStudentNotPresent[i].username);
          
        }
        // window.location.reload();
        console.log(this.setStudentNotPresent);
      
      })
      
  }
  addStudent(name: String){
    console.log("helloAddStudent");
    this.addStudentToDayRequest.dayName=this.singleDay.dayName;
    this.addStudentToDayRequest.studentName=name;
    console.log(this.addStudentToDayRequest);
    this.setStudentNotPresent.delete(name);
    
    this.dayService.addStudentToDay(this.addStudentToDayRequest )
      .subscribe(data => {
        // this.studentListByBatch();
        // window.location.reload();
      }, error => {
        console.log(error);
      });
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
    console.log(name);
  }
}
