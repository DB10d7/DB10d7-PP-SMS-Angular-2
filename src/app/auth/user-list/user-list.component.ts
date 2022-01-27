import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import * as XLSX from 'xlsx';
// import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  searchText: string="";
  resArray: any = [];
  listUser:any;
  convertedJson!:string;
  host:string=environment.apiUrl;
  constructor(private authService: AuthService,private httpClient: HttpClient,private route: ActivatedRoute, private router: Router) { }

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
