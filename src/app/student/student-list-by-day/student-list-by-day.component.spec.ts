import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListByDayComponent } from './student-list-by-day.component';

describe('StudentListByDayComponent', () => {
  let component: StudentListByDayComponent;
  let fixture: ComponentFixture<StudentListByDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentListByDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
