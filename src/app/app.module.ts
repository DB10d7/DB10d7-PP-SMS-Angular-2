import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { TokenInterceptor } from './token-interceptor';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './auth/update-user/update-user.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './auth/user-list/user-list.component';
import { HomeComponent } from './home/home.component';

import { BatchListComponent } from './batch/batch-list/batch-list.component';
import { SingleBatchComponent } from './batch/single-batch/single-batch.component';
import { DayListComponent } from './day/day-list/day-list.component';
import { SingleDayComponent } from './day/single-day/single-day.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { SingleStudentComponent } from './student/single-student/single-student.component';
import { DayListByBatchComponent } from './day/day-list-by-batch/day-list-by-batch.component';
import { StudentListByBatchComponent } from './student/student-list-by-batch/student-list-by-batch.component';
import { StudentListByDayComponent } from './student/student-list-by-day/student-list-by-day.component';
import { DayListByStudentComponent } from './day/day-list-by-student/day-list-by-student.component';
import { AddStudentToDayComponent } from './day/add-student-to-day/add-student-to-day.component';

import { CreateBatchComponent } from './batch/create-batch/create-batch.component';
import { UpdateBatchComponent } from './batch/update-batch/update-batch.component';
import { CreateDayComponent } from './day/create-day/create-day.component';
import { UpdateDayComponent } from './day/update-day/update-day.component';
import { UpdateDefaultRoleComponent } from './auth/update-default-role/update-default-role.component';
import { DefaultUserListComponent } from './auth/default-user-list/default-user-list.component';
import { DayListByTopicComponent } from './day/day-list-by-topic/day-list-by-topic.component';
import { NotAuthorizedComponent } from './auth/not-authorized/not-authorized.component';
import { EmployeeListComponent } from './auth/employee-list/employee-list.component';
import { UpdateProfileComponent } from './auth/update-profile/update-profile.component';
import { StudentHomeComponent } from './student-home/student-home.component';

import { FilterPipeStudent } from './student/filter-pipes-student';
import { FilterPipeDay } from './day/filter-pipe-day';
import { FilterPipeUser } from './auth/shared/filter-pipe-user';
import { FilterPipeBatch } from './batch/filter-pipes-batch';
import { FooterComponent } from './footer/footer.component';
import { AccountActivationPageComponent } from './auth/account-activation-page/account-activation-page.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UnverifiedUserComponent } from './auth/unverified-user/unverified-user.component';
import { SingleUserComponent } from './auth/single-user/single-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    FilterPipeStudent,
    FilterPipeDay,
    FilterPipeUser,
    FilterPipeBatch,
    LoginComponent,
    UserProfileComponent,
    SignupComponent,
    UpdateUserComponent,
    HeaderComponent,
    UserListComponent,
    HomeComponent,
    BatchListComponent,
    SingleBatchComponent,
    DayListComponent,
    SingleDayComponent,
    StudentListComponent,
    SingleStudentComponent,
    DayListByBatchComponent,
    StudentListByBatchComponent,
    StudentListByDayComponent,
    DayListByStudentComponent,
    AddStudentToDayComponent,
    CreateBatchComponent,
    UpdateBatchComponent,
    CreateDayComponent,
    UpdateDayComponent,
    UpdateDefaultRoleComponent,
    DefaultUserListComponent,
    DayListByTopicComponent,
    NotAuthorizedComponent,
    EmployeeListComponent,
    UpdateProfileComponent,
    StudentHomeComponent,
    FooterComponent,
    AccountActivationPageComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    UnverifiedUserComponent,
    SingleUserComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
