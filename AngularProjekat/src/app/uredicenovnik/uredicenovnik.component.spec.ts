import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UredicenovnikComponent } from './uredicenovnik.component';

describe('UredicenovnikComponent', () => {
  let component: UredicenovnikComponent;
  let fixture: ComponentFixture<UredicenovnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UredicenovnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UredicenovnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
