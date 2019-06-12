import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KupikartuComponent } from './kupikartu.component';

describe('KupikartuComponent', () => {
  let component: KupikartuComponent;
  let fixture: ComponentFixture<KupikartuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KupikartuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KupikartuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
