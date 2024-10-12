import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPrescriptionComponent } from './display-prescription.component';

describe('DisplayPrescriptionComponent', () => {
  let component: DisplayPrescriptionComponent;
  let fixture: ComponentFixture<DisplayPrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayPrescriptionComponent]
    });
    fixture = TestBed.createComponent(DisplayPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
