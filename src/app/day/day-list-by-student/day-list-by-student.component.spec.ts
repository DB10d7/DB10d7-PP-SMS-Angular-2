import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayListByStudentComponent } from './day-list-by-student.component';

describe('DayListByStudentComponent', () => {
  let component: DayListByStudentComponent;
  let fixture: ComponentFixture<DayListByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayListByStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayListByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
