import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list-by-batch',
  templateUrl: './student-list-by-batch.component.html',
  styleUrls: ['./student-list-by-batch.component.css']
})
export class StudentListByBatchComponent implements OnInit {
  listStudent:any;
  name: string="";
  searchText: string="";
  constructor(private studentService: StudentService,public authService: AuthService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewStudentList();
  }
  viewStudentList(){
    this.studentService.getStudentListByBatch(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.name=this.route.snapshot.params['name'];
      this.listStudent= result;
      console.log(this.listStudent);
    })
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
    console.log(name);
  }
  viewAllDays(name: String){
    this.router.navigate(['dayListByStudent/',name]);
  }
  deleteUnverifiedUser(id:Number){
    this.authService.deleteUser(id).subscribe(data =>{
      alert(data);
      this.ngOnInit();
    }, error =>{
      alert("Srry");
    });
  }
}
