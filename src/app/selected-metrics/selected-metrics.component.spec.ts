import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMetricsComponent } from './selected-metrics.component';

describe('SelectedMetricsComponent', () => {
  let component: SelectedMetricsComponent;
  let fixture: ComponentFixture<SelectedMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
