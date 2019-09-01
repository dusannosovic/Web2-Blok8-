import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolorvalidacijaprofilaComponent } from './kontrolorvalidacijaprofila.component';

describe('KontrolorvalidacijaprofilaComponent', () => {
  let component: KontrolorvalidacijaprofilaComponent;
  let fixture: ComponentFixture<KontrolorvalidacijaprofilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontrolorvalidacijaprofilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontrolorvalidacijaprofilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
