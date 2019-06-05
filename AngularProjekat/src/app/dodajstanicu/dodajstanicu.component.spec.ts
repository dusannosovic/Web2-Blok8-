import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajstanicuComponent } from './dodajstanicu.component';

describe('DodajstanicuComponent', () => {
  let component: DodajstanicuComponent;
  let fixture: ComponentFixture<DodajstanicuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajstanicuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajstanicuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
