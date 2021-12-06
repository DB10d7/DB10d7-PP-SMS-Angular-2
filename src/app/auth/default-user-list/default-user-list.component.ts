import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-default-user-list',
  templateUrl: './default-user-list.component.html',
  styleUrls: ['./default-user-list.component.css']
})
export class DefaultUserListComponent implements OnInit {
  listDefaultUsers:any;
  searchText: string="";
  resArray: any = [];
  defaultUserId: Number=0;
  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.authService.getDefaultRoleUserList().subscribe((resp)=>{
      this.listDefaultUsers = resp;
      })
  }
  recordId(id: Number){
    this.defaultUserId=id;
  }
  updateDefaultRoleUser(name: String){
    this.router.navigate(['updateDefaultUser/',name]);
  }
  deleteDefaultUser(id:Number){
    console.log(id);
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
    for(o in this.listDefaultUsers[0]){
      newArry.push(o);
    }
    this.resArray.push(newArry);
    console.log(this.resArray);
    for(let i=0; i<this.listDefaultUsers.length;i++){
       this.resArray.push(Object.values(this.listDefaultUsers[i]));
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
    x.setAttribute("download","PacketPrep's-Default-Role-User-List.csv");
    document.body.appendChild(x);
    x.click();
  }
}
