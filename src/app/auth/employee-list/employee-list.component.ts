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
}
