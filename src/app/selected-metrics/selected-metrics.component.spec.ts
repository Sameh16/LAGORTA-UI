import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMetricsComponent } from './selected-metrics.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SelectedMetricsComponent', () => {
  let component: SelectedMetricsComponent;
  let fixture: ComponentFixture<SelectedMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedMetricsComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
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
