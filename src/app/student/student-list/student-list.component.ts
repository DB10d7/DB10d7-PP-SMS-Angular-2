import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  listStudent:any;
  constructor(private studentService: StudentService ,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.studentService.getStudentList().subscribe((resp)=>{

      this.listStudent = resp;
      })
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
  }
  viewAllDays(name: String){
    this.router.navigate(['dayListByStudent/',name]);
  }

}
