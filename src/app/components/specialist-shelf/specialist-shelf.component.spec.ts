import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistShelfComponent } from './specialist-shelf.component';

describe('SpecialistShelfComponent', () => {
  let component: SpecialistShelfComponent;
  let fixture: ComponentFixture<SpecialistShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
