import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { DayService } from '../day.service';

@Component({
  selector: 'app-day-list-by-batch',
  templateUrl: './day-list-by-batch.component.html',
  styleUrls: ['./day-list-by-batch.component.css']
})
export class DayListByBatchComponent implements OnInit {
  listDay:any;
  batchName:string="";
  username: string="";
  searchText: string="";
  resArray: any = [];
  dayId: Number=0;
  listDayByStudent: Set<string> = new Set<string>() ;
  constructor(private dayService: DayService,public authService: AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewDayList();
    if(this.authService.getUserRole() === 'STUDENT'){
      this.username = this.authService.getUserName();
      this.viewDayListByStudent();
    }
  }
  viewDayList(){
    this.dayService.getDayListByBatch(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.batchName=this.route.snapshot.params['name'];
      this.listDay= result;
      console.log(this.listDay);
    })
  }
  viewDayListByStudent(){
    this.dayService.getDayListByStudent(this.username).subscribe((result)=>{
      console.log(this.username);
      console.log("data is here",result);
     // this.listDayByStudent= result;
     for (var i = 0; i < result.length; i++){
      // console.log("<br><br>array index: " + i);
      var obj = result[i];
      for (var key in obj){
        if(key==='dayName'){
          this.listDayByStudent.add(obj[key]);
        }
        // console.log("<br> - " + key + ": " + obj[key]);
        
      }
    }
      console.log('hello');
      console.log(this.listDayByStudent);
    })
  }
  viewStudentList(name: String){
    this.router.navigate(['studentListByDay/',name]);
    console.log(name);
  }
  recordId(id: Number){
    this.dayId= id;
  }
  viewDayToAddStudent(name: String){
    this.router.navigate(['addStudentToDay/', name]);
    console.log(name);
  }
  updateDay(name: String){
    this.router.navigate(['updateDay/', name]);
  }
  createDay(name: String){
    this.router.navigate(['createDay/', name]);
  }
  deleteDay(id: Number){
    this.dayService.deleteDay(id).subscribe(data =>{
      alert(data);
      window.location.reload();
    }, error =>{
      alert("srry");
    });
  }
  downloadExcel(){
    var newArry: any = [];
    var o;
    for(o in this.listDay[0]){
      newArry.push(o);
    }
    this.resArray.push(newArry);
    console.log(this.resArray);
    for(let i=0; i<this.listDay.length;i++){
       this.resArray.push(Object.values(this.listDay[i]));
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
    x.setAttribute("download",this.batchName+"-Day-List.csv");
    document.body.appendChild(x);
    x.click();
  }
}
