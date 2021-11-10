import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayListByTopicComponent } from './day-list-by-topic.component';

describe('DayListByTopicComponent', () => {
  let component: DayListByTopicComponent;
  let fixture: ComponentFixture<DayListByTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayListByTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayListByTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
