import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPhysicianComponent } from './display-physician.component';

describe('DisplayPhysicianComponent', () => {
  let component: DisplayPhysicianComponent;
  let fixture: ComponentFixture<DisplayPhysicianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayPhysicianComponent]
    });
    fixture = TestBed.createComponent(DisplayPhysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
