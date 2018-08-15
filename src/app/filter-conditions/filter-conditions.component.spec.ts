import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterConditionsComponent } from './filter-conditions.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FilterConditionsComponent', () => {
  let component: FilterConditionsComponent;
  let fixture: ComponentFixture<FilterConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterConditionsComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('drag', () => {

    it('drag oprator', () => {
      const ev = {
        target: {
          id: 1
        },
        dataTransfer: {
          exName: '',
          exId: 0,
          setData: (name, id) => {
            ev.dataTransfer.exId = id;
            ev.dataTransfer.exName = name;

          } ,
        getData: (name) => {
          if (name === 'operator') {
            return 'operator';
          } else {
            return '';
          }
        }
      }};
      component.drag(ev, 1);
      expect(ev.dataTransfer.exId).toBe(ev.target.id);
      console.log(ev.dataTransfer.getData('opetor'));
      expect('operator').toBe(ev.dataTransfer.exName);
    });

    it('drag metric', () => {
      const ev = {
        target: {
          id: 1
        },
        dataTransfer: {
          exName: '',
          exId: 0,
          setData: (name, id) => {
            ev.dataTransfer.exId = id;
            ev.dataTransfer.exName = name;
          }
      }};
      component.drag(ev, 0);
      expect(ev.dataTransfer.exId).toBe(ev.target.id);
      expect('metric').toBe(ev.dataTransfer.exName);
    });

    it('drag input', () => {
      const ev = {
        target: {
          id: 1
        },
        dataTransfer: {
          exName: '',
          exId: 0,
          setData: (name, id) => {
            ev.dataTransfer.exId = id;
            ev.dataTransfer.exName = name;
          }
      }};
      component.drag(ev, 2);
      expect(ev.dataTransfer.exId).toBe(ev.target.id);
      expect('input').toBe(ev.dataTransfer.exName);
    });

    it('drag metric with idx', () => {
      const ev = {
        target: {
          id: 1
        },
        dataTransfer: {
          exName: '',
          exId: 0,
          setData: (name, id) => {
            ev.dataTransfer.exId = id;
            ev.dataTransfer.exName = name;
          }
      }};
      component.drag(ev, 0, 0, 1);
      expect(ev.dataTransfer.exId).toBe(ev.target.id);
      expect('metric').toBe(ev.dataTransfer.exName);
      expect(localStorage.getItem('idx')).toBe('0');
      expect(localStorage.getItem('index')).toBe('1');
    });
  });

  describe('change gate', () => {

    it('should gate to be 0', () => {
      component.changeGate(0, 0);
      expect(component.conditions[0].gate).toBe(0);
    });

    it('should gate to be 1', () => {
      component.changeGate(0, 1);
      expect(component.conditions[0].gate).toBe(1);
    });

  });

  describe('remove', () => {
    it('choice should be removed', () => {
      const testObj = {type: 0, value: 'test'};
      component.conditions[0].choice.splice(0 , 0, testObj);
      const currentLength = component.conditions[0].choice.length;
      component.remove(0, 0);
      expect(component.conditions[0].choice.length).toBe(currentLength - 1);
    });
  });

  describe('deleteCondition', () => {

    it('condition should be removed without change gate', () => {
      const testObj = {
        choice: [],
        gate: null,
        isOpened: true
      };
      component.conditions.splice(0 , 1, testObj);

      const currentLength = component.conditions.length;
      component.deleteCondition(0);

      expect(component.conditions.length).toBe(currentLength - 1);
    });

    it('condition should be removed with change last gate', () => {
      const testObj = {
        choice: [],
        gate: null,
        isOpened: true
      };
      component.conditions.push(testObj);

      const currentLength = component.conditions.length;
      component.deleteCondition(currentLength - 1);

      expect(component.conditions[currentLength - 2].gate).toBeNull();
    });

  });

  describe('changeOperationsState', () => {

    it('condition choices should be closed', () => {
      const testObj = {
        choice: [],
        gate: null,
        isOpened: false
      };
      component.conditions.splice(0 , 1, testObj);

      component.changeOperationsState(0);

      expect(component.conditions[0].isOpened).toBeTruthy();
    });

    it('condition choices should be Opened', () => {
      const testObj = {
        choice: [],
        gate: null,
        isOpened: true
      };
      component.conditions.splice(0, 0, testObj);

      component.changeOperationsState(0);

      expect(component.conditions[0].isOpened).toBeFalsy();
    });

  });

  describe('is Operator', () => {
    it('AND shouldn\'t be operator', () => {
      const expectedRes = component.isOperator('AND');
      expect(expectedRes).toBeFalsy();
    });

    it('OR shouldn\'t be operator', () => {
      const expectedRes = component.isOperator('OR');
      expect(expectedRes).toBeFalsy();
    });

    it('+ should be operator', () => {
      const expectedRes = component.isOperator('+');
      expect(expectedRes).toBeTruthy();
    });
  });

});
