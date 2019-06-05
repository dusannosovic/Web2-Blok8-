import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UredistanicuComponent } from './uredistanicu.component';

describe('UredistanicuComponent', () => {
  let component: UredistanicuComponent;
  let fixture: ComponentFixture<UredistanicuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UredistanicuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UredistanicuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
