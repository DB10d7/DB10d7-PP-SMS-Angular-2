import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentToDayComponent } from './add-student-to-day.component';

describe('AddStudentToDayComponent', () => {
  let component: AddStudentToDayComponent;
  let fixture: ComponentFixture<AddStudentToDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentToDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentToDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
