import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.css']
})
export class SingleStudentComponent implements OnInit {
  singleStudent:any;
  constructor(private studentService:StudentService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.viewStudent();
  }
  viewStudent(){
    this.studentService.viewStudent(this.route.snapshot.params['name']).subscribe((result)=>{
      console.log("data is here",result);
      this.singleStudent= result;
      console.log(this.singleStudent);
    })
  }

}
