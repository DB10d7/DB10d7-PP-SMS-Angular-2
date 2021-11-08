import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDefaultRoleComponent } from './update-default-role.component';

describe('UpdateDefaultRoleComponent', () => {
  let component: UpdateDefaultRoleComponent;
  let fixture: ComponentFixture<UpdateDefaultRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDefaultRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDefaultRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
