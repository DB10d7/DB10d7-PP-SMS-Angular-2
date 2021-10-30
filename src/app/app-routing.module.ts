import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserListComponent } from './auth/user-list/user-list.component';
import { AuthGaurdService } from './auth/shared/auth-gaurd.service';
import { BatchListComponent } from './batch/batch-list/batch-list.component';
import { DayListComponent } from './day/day-list/day-list.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGaurdService] },
  {path: 'batchList', component: BatchListComponent, canActivate: [AuthGaurdService] },
  {path: 'dayList', component: DayListComponent, canActivate:[AuthGaurdService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
