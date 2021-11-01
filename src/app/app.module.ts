import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { TokenInterceptor } from './token-interceptor';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './auth/update-user/update-user.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './auth/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { TrainerHomeComponent } from './display-home/trainer-home/trainer-home.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    SignupComponent,
    UpdateUserComponent,
    HeaderComponent,
    UserListComponent,
    HomeComponent,
    TrainerHomeComponent,
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
    AddStudentToDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
