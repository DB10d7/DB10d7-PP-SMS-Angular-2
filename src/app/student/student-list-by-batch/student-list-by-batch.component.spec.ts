import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListByBatchComponent } from './student-list-by-batch.component';

describe('StudentListByBatchComponent', () => {
  let component: StudentListByBatchComponent;
  let fixture: ComponentFixture<StudentListByBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentListByBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListByBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
