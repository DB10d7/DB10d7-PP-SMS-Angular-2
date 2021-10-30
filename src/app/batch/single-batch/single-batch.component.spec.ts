import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBatchComponent } from './single-batch.component';

describe('SingleBatchComponent', () => {
  let component: SingleBatchComponent;
  let fixture: ComponentFixture<SingleBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
