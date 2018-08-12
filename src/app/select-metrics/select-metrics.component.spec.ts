import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMetricsComponent } from './select-metrics.component';

describe('SelectMetricsComponent', () => {
  let component: SelectMetricsComponent;
  let fixture: ComponentFixture<SelectMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
