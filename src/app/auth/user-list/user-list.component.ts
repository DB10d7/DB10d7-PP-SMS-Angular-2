import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listUser:any;
  constructor(private authService: SharedService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserList().subscribe((resp)=>{

      this.listUser = resp;
      })
  }

}
