import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayListByBatchComponent } from './day-list-by-batch.component';

describe('DayListByBatchComponent', () => {
  let component: DayListByBatchComponent;
  let fixture: ComponentFixture<DayListByBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayListByBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayListByBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
