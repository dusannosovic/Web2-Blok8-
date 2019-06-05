import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajpolazakComponent } from './dodajpolazak.component';

describe('DodajpolazakComponent', () => {
  let component: DodajpolazakComponent;
  let fixture: ComponentFixture<DodajpolazakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajpolazakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajpolazakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
