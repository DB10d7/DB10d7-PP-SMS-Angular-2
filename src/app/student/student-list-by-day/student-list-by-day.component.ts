import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService } from 'src/app/day/day.service';
import { StudentService } from '../student.service';
import { RemoveStudentRequest } from './removeStudentFromDayRequest.payload';

@Component({
  selector: 'app-student-list-by-day',
  templateUrl: './student-list-by-day.component.html',
  styleUrls: ['./student-list-by-day.component.css']
})
export class StudentListByDayComponent implements OnInit {
  listStudent:any;
  dayName: String="";
  removeStudentRequest : RemoveStudentRequest;
  resArray: any = [];
  searchText: string="";
  studentName: String="";
  constructor(private studentService: StudentService, private dayService: DayService , private router:Router, private route: ActivatedRoute) {
    this.removeStudentRequest = {
      studentName : '',
      dayName:'',
    };
   }

  ngOnInit(): void {
    this.viewStudentList();
  }
  viewStudentList(){
    this.studentService.getStudentListByDay(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      this.dayName=this.route.snapshot.params['name'];
      console.log("data is here",result);
      this.listStudent= result;
      console.log(this.listStudent);
    })
  }
  recordId(name: String){
    this.studentName= name;
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
    console.log(name);
  }
  viewAllDays(name: String){
    this.router.navigate(['dayListByStudent/',name]);
  }
  removeStudent(studentName : String){
    this.removeStudentRequest.studentName = studentName;
    this.removeStudentRequest.dayName = this.route.snapshot.params['name'];
    this.dayService.removeStudentFromDay(this.removeStudentRequest )
      .subscribe((data: any) => {
        window.location.reload();
      }, (error : any) => {
        console.log(error);
      });
  }
  downloadExcel(){
    var newArry: any = [];
    var o;
    for(o in this.listStudent[0]){
      newArry.push(o);
    }
    this.resArray.push(newArry);
    console.log(this.resArray);
    for(let i=0; i<this.listStudent.length;i++){
       this.resArray.push(Object.values(this.listStudent[i]));
    }
    console.log(this.resArray);
    var CsvString = "";
    this.resArray.forEach((RowItem: any, RowIndex: any) =>{
      console.log(RowItem);
      RowItem.forEach((ColItem: any, ColIndex:any) =>{
        CsvString += ColItem + ',';
      })
      console.log(CsvString);
      CsvString+= "\r\n";
    });
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", this.dayName+ "-Student-List.csv");
    document.body.appendChild(x);
    x.click();
  }
}
