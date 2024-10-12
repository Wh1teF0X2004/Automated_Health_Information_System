import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhysicianComponent } from './list-physician.component';

describe('ListPhysicianComponent', () => {
  let component: ListPhysicianComponent;
  let fixture: ComponentFixture<ListPhysicianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPhysicianComponent]
    });
    fixture = TestBed.createComponent(ListPhysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
