import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientComponent } from './list-patient.component';

describe('ListPatientComponent', () => {
  let component: ListPatientComponent;
  let fixture: ComponentFixture<ListPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPatientComponent]
    });
    fixture = TestBed.createComponent(ListPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
