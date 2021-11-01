import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserListComponent } from './auth/user-list/user-list.component';
import { AuthGaurdService } from './auth/shared/auth-gaurd.service';
import { BatchListComponent } from './batch/batch-list/batch-list.component';
import { DayListComponent } from './day/day-list/day-list.component';
import { DayListByBatchComponent } from './day/day-list-by-batch/day-list-by-batch.component';
import { SingleBatchComponent } from './batch/single-batch/single-batch.component';
import { SingleDayComponent } from './day/single-day/single-day.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { SingleStudentComponent } from './student/single-student/single-student.component';
import { StudentListByBatchComponent } from './student/student-list-by-batch/student-list-by-batch.component';
import { StudentListByDayComponent } from './student/student-list-by-day/student-list-by-day.component';
import { AddStudentToDayComponent } from './day/add-student-to-day/add-student-to-day.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGaurdService] },
  {path: 'batchList', component: BatchListComponent, canActivate: [AuthGaurdService] },
  {path: 'singleBatch/:name', component: SingleBatchComponent, canActivate: [AuthGaurdService] },
  {path: 'dayList', component: DayListComponent, canActivate:[AuthGaurdService] },
  {path: 'singleDay/:name', component: SingleDayComponent, canActivate: [AuthGaurdService] },
  {path: 'dayListByBatch/:name', component: DayListByBatchComponent, canActivate:[AuthGaurdService] },
  {path: 'studentList', component: StudentListComponent , canActivate:[AuthGaurdService] },
  {path: 'singleStudent/:name', component: SingleStudentComponent, canActivate:[AuthGaurdService] },
  {path: 'studentListByBatch/:name', component: StudentListByBatchComponent, canActivate:[AuthGaurdService] },
  {path: 'studentListByDay/:name', component: StudentListByDayComponent , canActivate:[AuthGaurdService] },
  {path: 'addStudentToDay/:name', component: AddStudentToDayComponent, canActivate:[AuthGaurdService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
