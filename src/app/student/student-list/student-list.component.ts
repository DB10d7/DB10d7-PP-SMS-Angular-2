import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  listStudent:any;
  searchText = '';
  resArray: any = [];
  studentId: Number=0;
  constructor(private studentService: StudentService,public authService:AuthService ,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.studentService.getStudentList().subscribe((resp)=>{

      this.listStudent = resp;
      })
  }
  recordId(id: Number){
    this.studentId=id;
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
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
    x.setAttribute("download","PacketPrep's-Student-List.csv");
    document.body.appendChild(x);
    x.click();
  }
}
