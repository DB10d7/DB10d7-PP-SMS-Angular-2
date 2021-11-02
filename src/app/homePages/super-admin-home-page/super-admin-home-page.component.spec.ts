import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminHomePageComponent } from './super-admin-home-page.component';

describe('SuperAdminHomePageComponent', () => {
  let component: SuperAdminHomePageComponent;
  let fixture: ComponentFixture<SuperAdminHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
