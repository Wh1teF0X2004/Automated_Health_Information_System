import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateAdminComponent } from './validate-admin.component';

describe('ValidateAdminComponent', () => {
  let component: ValidateAdminComponent;
  let fixture: ComponentFixture<ValidateAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateAdminComponent]
    });
    fixture = TestBed.createComponent(ValidateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
