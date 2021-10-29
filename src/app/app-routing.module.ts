import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserListComponent } from './auth/user-list/user-list.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'userList', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
