import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajlinijuComponent } from './dodajliniju.component';

describe('DodajlinijuComponent', () => {
  let component: DodajlinijuComponent;
  let fixture: ComponentFixture<DodajlinijuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajlinijuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajlinijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
