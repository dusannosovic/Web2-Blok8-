import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VozilomapaComponent } from './vozilomapa.component';

describe('VozilomapaComponent', () => {
  let component: VozilomapaComponent;
  let fixture: ComponentFixture<VozilomapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VozilomapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VozilomapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
