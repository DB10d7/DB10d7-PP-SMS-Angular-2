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
}
