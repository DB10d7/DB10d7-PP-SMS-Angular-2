import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  listEmployee:any;
  searchText: string="";
  resArray: any = [];
  employeeId: Number=0;
  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.authService.getEmployeeList().subscribe((resp)=>{
  
      this.listEmployee = resp;
      console.log(this.listEmployee);
      })
  }
  viewSingleUser(name: String){
    this.router.navigate(['singleUser/',name]);
  }
  updateUser(name: String){
    this.router.navigate(['updateUser/',name]);
  }
  recordId(id: Number){
    this.employeeId= id;
  }
  deleteEmployee(id:Number){
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
    for(o in this.listEmployee[0]){
      newArry.push(o);
    }
    this.resArray.push(newArry);
    console.log(this.resArray);
    for(let i=0; i<this.listEmployee.length;i++){
       this.resArray.push(Object.values(this.listEmployee[i]));
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
    x.setAttribute("download", "PacketPrep-Employee-List.csv");
    document.body.appendChild(x);
    x.click();
  }
}
