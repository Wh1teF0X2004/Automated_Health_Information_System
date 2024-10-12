import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiagnosisComponent } from './update-diagnosis.component';

describe('UpdateDiagnosisComponent', () => {
  let component: UpdateDiagnosisComponent;
  let fixture: ComponentFixture<UpdateDiagnosisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDiagnosisComponent]
    });
    fixture = TestBed.createComponent(UpdateDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
