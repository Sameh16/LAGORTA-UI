import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterConditionsComponent } from './filter-conditions.component';


describe('OnChangeInputText',()=>{
  const filterCondition= new FilterConditionsComponent();
  it('value must be changed based on the addInput text value',()=>{
    const newValue = 'ABC';
    const newInput = { type: 2, value: '' };
    filterCondition.conditions[0].choice.push(newInput);
    filterCondition.onChangeInput(newValue,0,0);
    expect(newValue).toBe(filterCondition.conditions[0].choice[0].value);
  });
});
/// ================ addOperator Function =================================
describe('add new operator in Choices',()=>{
  var filterCondition;
  beforeEach(async(() => {
    filterCondition = new FilterConditionsComponent();
  }));
  it('new operator must not be added because it can not be the first element',()=>{
    const newOperator = { type: 1, value: 'AND' };
    const beforelength = filterCondition.conditions[0].choice.length;
    filterCondition.addOperator(newOperator,0);
    const afterlength = filterCondition.conditions[0].choice.length;
    expect(afterlength).toBe(beforelength);
  });
  it('new operator must not be added because it can not be after another operator directly',()=>{
    const newOperator1 = 'AND';
    filterCondition.addOperator(newOperator1,0);

    const beforelength = filterCondition.conditions[0].choice.length;

    const newOperator2 = 'OR';
    filterCondition.addOperator(newOperator2,0);

    const afterlength = filterCondition.conditions[0].choice.length;
    expect(afterlength).toBe(beforelength);
  });
  it('new operator must be added because there is a metric before it',()=>{
    const newMetric = { type: 0, value: 'metricValue' };
    filterCondition.conditions[0].choice.push(newMetric);

    const beforelength = filterCondition.conditions[0].choice.length;

    const newOperatorValue='=';
    filterCondition.addOperator(newOperatorValue,0);

    const afterlength = filterCondition.conditions[0].choice.length;

    expect(afterlength).toBe(beforelength+1);
    expect(newOperatorValue).toBe(filterCondition.conditions[0].choice[1].value);
  });
  it('new operator must be added because there is an input before it',()=>{
    const newInput = { type: 2, value: 'InputValue' };
    filterCondition.conditions[0].choice.push(newInput);

    const beforelength = filterCondition.conditions[0].choice.length;

    const newOperatorValue='=';
    filterCondition.addOperator(newOperatorValue,0);

    const afterlength = filterCondition.conditions[0].choice.length;

    expect(afterlength).toBe(beforelength+1);
    expect(newOperatorValue).toBe(filterCondition.conditions[0].choice[1].value);
  });
});
/// ================ addMetric Function =================================
describe('add new Metric in Choices',()=>{
  var filterCondition;
  beforeEach(async(() => {
    filterCondition = new FilterConditionsComponent();
  }));
  it('new Metric must be added because it can be the first element',()=>{
    const newMetric = 'Metric' ;
    const beforelength = filterCondition.conditions[0].choice.length;
    filterCondition.addMetric(newMetric,0);
    const afterlength = filterCondition.conditions[0].choice.length;
    expect(afterlength).toBe(beforelength+1);
  });
  it('new Metric must not be added because it can not be after another Metric directly',()=>{
    const newMetric1 = 'Metric1';
    filterCondition.addMetric(newMetric1,0);

    const beforelength = filterCondition.conditions[0].choice.length;

    const newMetric2 = 'Metric2';
    filterCondition.addMetric(newMetric2,0);

    const afterlength = filterCondition.conditions[0].choice.length;
    expect(afterlength).toBe(beforelength);
  });
  it('new Metric must not be added because it can not be after Input directly',()=>{
    const newInput={type:2 , value:'newInput'}
    filterCondition.conditions[0].choice.push(newInput);

    const beforelength = filterCondition.conditions[0].choice.length;

    const newMetric = 'Metric';
    filterCondition.addMetric(newMetric,0);

    const afterlength = filterCondition.conditions[0].choice.length;
    expect(afterlength).toBe(beforelength);
  });
  it('new metric must be added because there is an operator before it',()=>{
    const newOperator = { type: 1, value: '=' };
    filterCondition.conditions[0].choice.push(newOperator);

    const beforelength = filterCondition.conditions[0].choice.length;

    const newMetricValue='Metric';
    filterCondition.addMetric(newMetricValue,0);

    const afterlength = filterCondition.conditions[0].choice.length;

    expect(afterlength).toBe(beforelength+1);
    expect(newMetricValue).toBe(filterCondition.conditions[0].choice[1].value);
  });
});
/// ================ addInput Function =================================
describe('add new Input in Choices',()=>{
  var filterCondition;
  beforeEach(async(() => {
    filterCondition = new FilterConditionsComponent();
  }));
  it('new Input must be added because it can be the first element',()=>{
    const newInput = 'input' ;
    const beforelength = filterCondition.conditions[0].choice.length;
    filterCondition.addInput(newInput,0);
    const afterlength = filterCondition.conditions[0].choice.length;
    expect(afterlength).toBe(beforelength+1);
  });
  it('new Input must not be added because it can not be after Metric directly',()=>{
    const newMetric = 'Metric';
    filterCondition.addMetric(newMetric,0);

    const beforelength = filterCondition.conditions[0].choice.length;
    
    const newInput = 'input';
    filterCondition.addInput(newInput,0);


    const afterlength = filterCondition.conditions[0].choice.length;
    expect(afterlength).toBe(beforelength);
  });
  it('new Input must not be added because it can not be after another Input directly',()=>{
    filterCondition.addInput('',0);
    const beforelength = filterCondition.conditions[0].choice.length;

    filterCondition.addInput('',0);

    const afterlength = filterCondition.conditions[0].choice.length;
    expect(afterlength).toBe(beforelength);
  });
  it('new metric must be added because there is an operator before it',()=>{
    const newOperator = { type: 1, value: '=' };
    filterCondition.conditions[0].choice.push(newOperator);

    const beforelength = filterCondition.conditions[0].choice.length;

    filterCondition.addInput('',0);

    const afterlength = filterCondition.conditions[0].choice.length;

    expect(afterlength).toBe(beforelength+1);
  });
});
/// ================ addChoice Function =================================
describe('add new Choice',()=>{
  const filterCondition= new FilterConditionsComponent();
  it('new chice must be added without a gate and open the gate before it',()=>{
    const beforeLength = filterCondition.conditions.length;
    const beforeGate1 = filterCondition.conditions[0].gate;
    filterCondition.addChoice();
    const afterGate1 = filterCondition.conditions[0].gate;
    const afterGate2 = filterCondition.conditions[1].gate;

    expect(afterGate2).toBeNull();
    expect(beforeGate1).toBeNull();
    var valid=(afterGate1===null);
    expect(valid).toBeFalsy();
  });
});