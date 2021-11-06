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
import { RoleGaurdGuard } from './auth/shared/role-gaurd.guard';
import { DayListByStudentComponent } from './day/day-list-by-student/day-list-by-student.component';
import { UpdateUserComponent } from './auth/update-user/update-user.component';
import { SuperAdminHomePageComponent } from './homePages/super-admin-home-page/super-admin-home-page.component';
import { TrainerHomePageComponent } from './homePages/trainer-home-page/trainer-home-page.component';
import { AdminHomePageComponent } from './homePages/admin-home-page/admin-home-page.component';
import { StudentHomePageComponent } from './homePages/student-home-page/student-home-page.component';
import { CreateBatchComponent } from './batch/create-batch/create-batch.component';
import { UpdateBatchComponent } from './batch/update-batch/update-batch.component';
import { CreateDayComponent } from './day/create-day/create-day.component';
import { UpdateDayComponent } from './day/update-day/update-day.component';

const routes: Routes = [

  {path: 'sign-up', component: SignupComponent },
  {path: '', component: LoginComponent },
  
  {path: 'superAdminHomePage', component: SuperAdminHomePageComponent, canActivate: [AuthGaurdService,RoleGaurdGuard] , data:{ expectedRoles: ['SUPER-ADMIN'] }},
  {path: 'adminHomePage', component: AdminHomePageComponent, canActivate: [AuthGaurdService,RoleGaurdGuard] , data:{ expectedRoles: ['SUPER-ADMIN','ADMIN'] }},
  {path: 'trainerHomePage', component: TrainerHomePageComponent, canActivate: [AuthGaurdService,RoleGaurdGuard] , data:{ expectedRoles: ['SUPER-ADMIN','TRAINER'] }},
  {path: 'studentHomePage', component: StudentHomePageComponent, canActivate: [AuthGaurdService,RoleGaurdGuard] , data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN','STUDENT'] }},
  
  {path: 'createBatch', component: CreateBatchComponent, canActivate: [AuthGaurdService,RoleGaurdGuard],data:{ expectedRoles: ['SUPER-ADMIN','TRAINER'] }},
  {path: 'updateBatch/:name', component: UpdateBatchComponent, canActivate: [AuthGaurdService,RoleGaurdGuard],data:{ expectedRoles: ['SUPER-ADMIN','TRAINER'] }},
  {path: 'createDay/:name', component: CreateDayComponent, canActivate: [AuthGaurdService,RoleGaurdGuard],data:{ expectedRoles: ['SUPER-ADMIN','TRAINER'] }},
  {path: 'updateDay/:name', component: UpdateDayComponent, canActivate: [AuthGaurdService,RoleGaurdGuard],data:{ expectedRoles: ['SUPER-ADMIN','TRAINER'] }},
  {path: 'userList', component: UserListComponent, canActivate: [AuthGaurdService,RoleGaurdGuard],data:{ expectedRoles: ['SUPER-ADMIN'] }},
  {path: 'batchList', component: BatchListComponent, canActivate: [AuthGaurdService,RoleGaurdGuard] , data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN'] }},
  {path: 'singleBatch/:name', component: SingleBatchComponent, canActivate: [AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN','STUDENT'] }},
  {path: 'dayList', component: DayListComponent, canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN'] }},
  {path: 'singleDay/:name', component: SingleDayComponent, canActivate: [AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN','STUDENT'] }},
  {path: 'dayListByBatch/:name', component: DayListByBatchComponent, canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN','STUDENT'] }},
  {path: 'studentList', component: StudentListComponent , canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN'] }},
  {path: 'singleStudent/:name', component: SingleStudentComponent, canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN','STUDENT'] }},
  {path: 'studentListByBatch/:name', component: StudentListByBatchComponent, canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN'] }},
  {path: 'studentListByDay/:name', component: StudentListByDayComponent , canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN'] }},
  {path: 'addStudentToDay/:name', component: AddStudentToDayComponent, canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER'] }},
  {path: 'dayListByStudent/:name', component: DayListByStudentComponent, canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN','TRAINER','ADMIN','STUDENT'] }},
  {path: 'updateUser/:name', component: UpdateUserComponent, canActivate:[AuthGaurdService,RoleGaurdGuard], data:{ expectedRoles: ['SUPER-ADMIN'] }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
