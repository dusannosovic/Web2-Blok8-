import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UredilinijuComponent } from './urediliniju.component';

describe('UredilinijuComponent', () => {
  let component: UredilinijuComponent;
  let fixture: ComponentFixture<UredilinijuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UredilinijuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UredilinijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
