import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultUserListComponent } from './default-user-list.component';

describe('DefaultUserListComponent', () => {
  let component: DefaultUserListComponent;
  let fixture: ComponentFixture<DefaultUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
