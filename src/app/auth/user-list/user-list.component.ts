import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  searchText: string="";
  resArray: any = [];
  listUser:any;
  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserList().subscribe((resp)=>{

      this.listUser = resp;
      })
  }
  viewSingleUser(name: String){
    this.router.navigate(['singleUser/',name]);
  }
  updateUser(name: String){
    this.router.navigate(['updateUser/',name]);
  }
  downloadExcel(){
    var newArry: any = [];
    var o;
    for(o in this.listUser[0]){
      newArry.push(o);
    }
    this.resArray.push(newArry);
    console.log(this.resArray);
    for(let i=0; i<this.listUser.length;i++){
       this.resArray.push(Object.values(this.listUser[i]));
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
    x.setAttribute("download","PacketPrep's-User-List.csv");
    document.body.appendChild(x);
    x.click();
  }
}
