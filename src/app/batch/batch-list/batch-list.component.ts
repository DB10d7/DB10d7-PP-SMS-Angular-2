import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
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
  constructor(private batchService: BatchService,public authService: AuthService,private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.batchService.getBatchList().subscribe((resp)=>{

      this.listBatch = resp;
      console.log(this.listBatch);
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
