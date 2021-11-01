import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list-by-batch',
  templateUrl: './student-list-by-batch.component.html',
  styleUrls: ['./student-list-by-batch.component.css']
})
export class StudentListByBatchComponent implements OnInit {
  listStudent:any;
  constructor(private studentService: StudentService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewStudentList();
  }
  viewStudentList(){
    this.studentService.getStudentListByBatch(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log(this.route.snapshot.params['name']);
      console.log("data is here",result);
      this.listStudent= result;
      console.log(this.listStudent);
    })
  }
}
