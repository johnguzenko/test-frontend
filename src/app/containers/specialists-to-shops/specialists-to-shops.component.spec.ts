import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistsToShopsComponent } from './specialists-to-shops.component';

describe('SpecialistsToShopsComponent', () => {
  let component: SpecialistsToShopsComponent;
  let fixture: ComponentFixture<SpecialistsToShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistsToShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistsToShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
