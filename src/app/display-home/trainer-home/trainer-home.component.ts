import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.css']
})
export class TrainerHomeComponent implements OnInit {

  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router) { }
  listBatch:any;
  ngOnInit(): void {
    this.authService.getUserList().subscribe((resp)=>{

      this.listBatch = resp;
      })
  }

}

