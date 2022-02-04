import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { DayService } from 'src/app/day/day.service';
import { StudentService } from '../student.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignupRequestPayload } from 'src/app/auth/signup/signup-request.payload';
import { BatchListComponent } from 'src/app/batch/batch-list/batch-list.component';

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
  convertedJson!:string;
  host:string=environment.apiUrl;
  listCleanData:SignupRequestPayload;
  listData!:any;
  constructor(private studentService: StudentService,private httpClient: HttpClient, private dayService: DayService ,public authService: AuthService, private router:Router, private route: ActivatedRoute) { 
    this.listCleanData = {
      username: '',
      name:'',
      email: '',
      uname:'',
      password: '',
      confirmPassword: '',
      
      city: '',
      surname: '',
      state: '',
      tenthMarks: '',
      twelfthMarks: '',
      graduationMarks: '',
      number: '',
      birthDate: new Date(),
      yearOfPassing: '',
      gender: '',
      collegeName: '',
      university: '',
      graduation: '',
      graduationBranch: '',
      batch: '',
      role: ''
    };
  }

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
    this.dayService.getDayListByBatch(this.route.snapshot.params['name']).subscribe((res)=>{
      this.listTotalDays=res;
      this.totalDays=this.listTotalDays.length;
      console.log(this.totalDays);
      for(var i=0;i<this.listStudent.length;i++){
        console.log(this.listStudent[i].username);
        this.viewDaysListByStudent(this.listStudent[i].username);
        
      }
      
    })
  }
  fetchApi(){
    var batch = this.route.snapshot.params['name'];
    console.log(batch);
    console.log(batch.length);
    var search='';
    for(var i=0;i<batch.length;i++){
      
      if(batch[i]>='A' && batch[i]<='Z'){
        search+=batch[i].toLowerCase();
        console.log(batch[i]);
      }else if(batch[i]>='0' && batch[i]<='9'){
        search+=batch[i];
        console.log(batch[i]);
      }
    }
    console.log(search);
    this.authService.getApiData(search).subscribe((result)=>{
      this.listData=result;
      console.log(this.listData)
      console.log(this.listData.length);
      for(var i=0;i<this.listData.length;i++){
        
        this.listCleanData.username = ""+this.listData[i].id;
        this.listCleanData.uname = this.listData[i].username;
        this.listCleanData.name = this.listData[i].name;
        this.listCleanData.email = this.listData[i].email;
        this.listCleanData.number = this.listData[i].phone;
        this.listCleanData.yearOfPassing = this.listData[i].year_of_passing;
        this.listCleanData.tenthMarks = this.listData[i].tenth;
        this.listCleanData.twelfthMarks = this.listData[i].twelveth;
        this.listCleanData.graduationMarks = this.listData[i].bachelors;
        this.listCleanData.city = this.listData[i].current_city;
        this.listCleanData.gender = this.listData[i].gender;
        this.listCleanData.graduation = "B.Tech";
        this.listCleanData.graduationBranch = "OTHERS";
        this.listCleanData.birthDate = this.listData[i].dob;
        this.listCleanData.batch = batch;
        this.listCleanData.role = "STUDENT"
        this.listCleanData.password = "PacketPrep";
        this.listCleanData.collegeName = "NA";
        this.listCleanData.university = "NA";
        console.log(this.listCleanData);
        this.uploadApiData(this.listCleanData);
      }
      
      console.log(this.listCleanData);
      // window.location.reload();
    })
    // window.location.reload();
  }
  uploadApiData(list: any){
    this.authService.uploadApiData(list).subscribe((result)=>{
      console.log("Data uploaded");
    })
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
          
          this.router.navigate(['studentListByBatch/'+ this.route.snapshot.params['name']]);
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
