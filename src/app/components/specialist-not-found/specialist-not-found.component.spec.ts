import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistNotFoundComponent } from './specialist-not-found.component';

describe('SpecialistNotFoundComponent', () => {
  let component: SpecialistNotFoundComponent;
  let fixture: ComponentFixture<SpecialistNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
