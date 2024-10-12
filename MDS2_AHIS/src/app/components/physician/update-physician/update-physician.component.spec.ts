import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhysicianComponent } from './update-physician.component';

describe('UpdatePhysicianComponent', () => {
  let component: UpdatePhysicianComponent;
  let fixture: ComponentFixture<UpdatePhysicianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePhysicianComponent]
    });
    fixture = TestBed.createComponent(UpdatePhysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
