import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService ,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout().subscribe(data =>{
      alert(data);
      this.router.navigate(['']); 
    }, error =>{
      alert('Sorry! Unable to Logout')
      this.router.navigate(['']);
    });
    
  }
}
