import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { DayService } from 'src/app/day/day.service';
import { StudentService } from 'src/app/student/student.service';
import { BatchService } from '../batch.service';


@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {
  listBatch:any;
  searchText: string="";
  resArray: any = [];
  students:any;
  days:any;
  batchToStudentMap: Map<String, number>= new Map() ;
  batchToDayMap: Map<String, number>= new Map() ;
  batchId: Number=0;
  constructor(private batchService: BatchService,public dayService: DayService,public authService: AuthService,private studentService: StudentService,private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.batchService.getBatchList().subscribe((resp)=>{

      this.listBatch = resp;
      console.log(this.listBatch);
      for(var i=0;i<this.listBatch.length;i++){
        this.numberOfStudentsByBatch(this.listBatch[i].name);
        this.numberOfDaysByBatch(this.listBatch[i].name);
      }
      
      })

  }
  recordId(id: Number){
    this.batchId= id;
    console.log(this.batchId);
  }
  deleteBatch(){
    
    this.batchService.deleteBatch(this.batchId).subscribe(data =>{
      // alert(data);
      // this.ngOnInit();
      window.location.reload();
    }, error =>{
      alert("srry");
    });
  }
  numberOfStudentsByBatch(name : string){
    this.studentService.getStudentListByBatch(name).subscribe((resp)=>{
      this.students = resp;
      console.log(this.students);
      this.batchToStudentMap.set(name,this.students.length);
      // for(var i=0;i<this.listBatch;i++){
      //   this.batchToStudentMap.set(this.listBatch.get(i).name,0);
      //   for(var j=0;j<this.totalStudents;j++){
      //     // if(this.listBatch.get(i).n)
      //     if(this.listBatch.get(i).name === this.totalStudents.get(j).batch){
      //       this.batchToStudentMap.set(this.listBatch.get(i).name, this.batchToStudentMap.get(this.listBatch.get(i).name)+1);
      //     }
      //   }
      // }
    })
  }
  numberOfDaysByBatch(name : string){
    this.dayService.getDayListByBatch(name).subscribe((resp)=>{
      this.days = resp;
      console.log(this.days);
      this.batchToDayMap.set(name,this.days.length);
      // for(var i=0;i<this.listBatch;i++){
      //   this.batchToStudentMap.set(this.listBatch.get(i).name,0);
      //   for(var j=0;j<this.totalStudents;j++){
      //     // if(this.listBatch.get(i).n)
      //     if(this.listBatch.get(i).name === this.totalStudents.get(j).batch){
      //       this.batchToStudentMap.set(this.listBatch.get(i).name, this.batchToStudentMap.get(this.listBatch.get(i).name)+1);
      //     }
      //   }
      // }
    })
  }
  viewBatch(name: String){
    this.router.navigate(['singleBatch/',name]);
  }
  viewDayList(name: String){
    this.router.navigate(['dayListByBatch/',name]);
    console.log(name);
  }
  viewStudentList(name: String){
    this.router.navigate(['studentListByBatch/',name]);
    console.log(name);
  }
  updateBatch(name: String){
    this.router.navigate(['updateBatch/',name]);
  }
  createBatch(){
    this.router.navigate(['createBatch']);
  }
  downloadExcel(){
    var newArry: any = [];
    var o;
    for(o in this.listBatch[0]){
      newArry.push(o);
    }
    this.resArray.push(newArry);
    console.log(this.resArray);
    for(let i=0; i<this.listBatch.length;i++){
       this.resArray.push(Object.values(this.listBatch[i]));
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
    x.setAttribute("download", "PacketPrep's-Batch-List.csv");
    document.body.appendChild(x);
    x.click();
  }
}
