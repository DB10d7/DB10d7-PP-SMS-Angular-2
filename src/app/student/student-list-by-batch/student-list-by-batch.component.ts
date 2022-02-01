import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { DayService } from 'src/app/day/day.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list-by-batch',
  templateUrl: './student-list-by-batch.component.html',
  styleUrls: ['./student-list-by-batch.component.css']
})
export class StudentListByBatchComponent implements OnInit {
  listStudent:any;
  name: string="";
  resArray: any = [];
  searchText: string="";
  studentId: Number=0;
  listTotalDays:any;
  totalDays!: number;
  numberOfDaysByStudent: Map<string,number>= new Map();
  listDaysPresent:any;
  constructor(private studentService: StudentService, private dayService: DayService ,public authService: AuthService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewStudentList();
  }
  viewStudentList(){
    this.studentService.getStudentListByBatch(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.name=this.route.snapshot.params['name'];
      this.listStudent= result;
      console.log(this.listStudent);
      this.viewDaysListByBatch();
    })
  }
  viewDaysListByBatch(){
    this.dayService.getDayListByBatch(this.listStudent[0].batch).subscribe((res)=>{
      this.listTotalDays=res;
      this.totalDays=this.listTotalDays.length;
      console.log(this.totalDays);
      for(var i=0;i<this.listStudent.length;i++){
        console.log(this.listStudent[i].username);
        this.viewDaysListByStudent(this.listStudent[i].username);
        
      }
      
    })
  }
  viewDaysListByStudent(name : string){
    
    this.dayService.getDayListByStudent(name).subscribe((result)=>{
      // console.log(this.listStudent[i].username);
      this.listDaysPresent=result;
    //  var listDaysPresent=res;
    //  console.log(res);
    //  console.log(listDaysPresent);
    //  this.listDaysPresent.add(listDaysPresent);
        console.log(this.listDaysPresent.length)
        this.numberOfDaysByStudent.set(name,this.listDaysPresent.length);
      // console.log(this.listStudent[i].username);
      // console.log(this.listDaysPresent.length);
      // this.listStudent[i].add("daysPresent",this.listDaysPresent.length);
      // console.log(this.listStudent);
    })
    // console.log(this.numberOfDaysByStudent);
    
  }
  updateStudent(name: String){
    this.router.navigate(['updateUser/',name]);
  }
  recordId(id: Number){
    this.studentId=id;
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
    console.log(name);
  }
  viewAllDays(name: String){
    this.router.navigate(['dayListByStudent/',name]);
  }
  deleteStudent(id:Number){
    this.authService.deleteUser(id).subscribe(data =>{
      // alert(data);
      // this.ngOnInit();
      window.location.reload();
    }, error =>{
      alert("Srry");
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
    x.setAttribute("download",this.name+ "-Student-List.csv");
    document.body.appendChild(x);
    x.click();
  }
}
