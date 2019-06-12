import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KarteprikazComponent } from './karteprikaz.component';

describe('KarteprikazComponent', () => {
  let component: KarteprikazComponent;
  let fixture: ComponentFixture<KarteprikazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KarteprikazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KarteprikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
