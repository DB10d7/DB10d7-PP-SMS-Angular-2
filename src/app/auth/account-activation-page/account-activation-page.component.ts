import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from 'src/app/batch/batch.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-account-activation-page',
  templateUrl: './account-activation-page.component.html',
  styleUrls: ['./account-activation-page.component.css']
})
export class AccountActivationPageComponent implements OnInit {
  token: String="";
  constructor(public authService:AuthService,private batchService: BatchService, private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token= this.route.snapshot.params['token'];
    console.log(this.token);
    this.authService.activateAccount(this.token);
  }

}
