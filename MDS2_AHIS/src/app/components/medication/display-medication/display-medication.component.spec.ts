import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMedicationComponent } from './display-medication.component';

describe('DisplayMedicationComponent', () => {
  let component: DisplayMedicationComponent;
  let fixture: ComponentFixture<DisplayMedicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayMedicationComponent]
    });
    fixture = TestBed.createComponent(DisplayMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
