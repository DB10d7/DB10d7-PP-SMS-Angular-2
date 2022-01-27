import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { StudentService } from '../student.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  listStudent:any;
  searchText = '';
  resArray: any = [];
  convertedJson!:string;
  studentId: Number=0;
  host:string=environment.apiUrl;
  constructor(private studentService: StudentService,private httpClient: HttpClient,public authService:AuthService ,private route: ActivatedRoute, private router: Router) { }

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
  fileUpload(event:any){
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event:any)=> {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {type:'binary'});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data);
        this.convertedJson= JSON.stringify(data,undefined,4);
        console.log(this.convertedJson);
        this.httpClient.post(this.host+'api/auth/uploadExcel', this.convertedJson, { responseType: 'text' })
        .subscribe((response) => {
        if (response === "Uploaded") {
          
          alert('Data uploaded successfully');
          
          this.router.navigate(['userList']);
        } else {
          
          alert('Data not uploaded successfully');
        }
        
      }, error =>{
        alert('Data not uploaded successfully')
      }
      );
      })
      console.log(workbook);
    }
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
