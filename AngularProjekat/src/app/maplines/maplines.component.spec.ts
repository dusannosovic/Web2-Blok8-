import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaplinesComponent } from './maplines.component';

describe('MaplinesComponent', () => {
  let component: MaplinesComponent;
  let fixture: ComponentFixture<MaplinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaplinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
