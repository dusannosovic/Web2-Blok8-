import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolorvalidacijakarteComponent } from './kontrolorvalidacijakarte.component';

describe('KontrolorvalidacijakarteComponent', () => {
  let component: KontrolorvalidacijakarteComponent;
  let fixture: ComponentFixture<KontrolorvalidacijakarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontrolorvalidacijakarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontrolorvalidacijakarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
