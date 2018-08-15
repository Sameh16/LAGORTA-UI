import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-conditions',
  templateUrl: './filter-conditions.component.html',
  styleUrls: ['./filter-conditions.component.css']
})
export class FilterConditionsComponent {
  conditions = [
    {
      choice: [
      ],
      gate: null, // (0 for and , 1 for or) gate for next choice
      isOpened: true // el operators list
    }
  ];
  viewDefinition = true;

  operators = [
    [{ value: '/', id: 'op1' }, { value: '%', id: 'op2' },
    { value: '-', id: 'op3' }, { value: 'x', id: 'op4' }, { value: '+', id: 'op5' }],
    [{ value: '=', id: 'op10' }, { value: '!=', id: 'op9' }, { value: '>', id: 'op6' },
    { value: '>=', id: 'op11' }, { value: '<', id: 'op8' }, { value: '<=', id: 'op7' }]
  ];
  constructor() { }

  removeDefinition() {
    this.viewDefinition = false;
  }

  onChangeInput(value, idx, index) {
    this.conditions[idx].choice[index].value = value;
  }
  allowDrop(ev) {
    ev.preventDefault();
  }

  drop2(ev, idx, index) {
    let data;
    let newType;
    if (ev.dataTransfer.getData('metric') !== '') {
      data = ev.dataTransfer.getData('metric');
      newType = 0;
    } else if (ev.dataTransfer.getData('operator') !== '') {
      data = ev.dataTransfer.getData('operator');
      newType = 1;
    } else if (ev.dataTransfer.getData('input') !== '') {
      data = ev.dataTransfer.getData('input');
      newType = 2;
    } else {
      return;
    }
    let newChoice;
    if (localStorage.getItem('idx') !== null) {
      const tmpIdx = localStorage.getItem('idx');
      const tmpIndex = localStorage.getItem('index');
      newChoice = { ...this.conditions[tmpIdx].choice[tmpIndex] };
      this.conditions[tmpIdx].choice.splice(tmpIndex, 1);
      localStorage.clear();
    }
    const el = document.getElementById(data);
    const myChoice = this.conditions[idx].choice;
    if (newChoice === undefined) {
      newChoice = { type: newType, value: el.innerText };
    }
    const temp = { ...myChoice };
    myChoice.splice(index, 0, newChoice);
  }

  drop(ev, idx) {
    ev.preventDefault();

    if (ev.dataTransfer.getData('metric') !== '') {
      const data = ev.dataTransfer.getData('metric');
      const el = document.getElementById(data);
      const content = el.innerText;
      this.addMetric(content, idx);

    } else if (ev.dataTransfer.getData('operator') !== '') {
      const data = ev.dataTransfer.getData('operator');
      const el = document.getElementById(data);
      const content = el.innerText;
      this.addOperator(content, idx);
    } else {
      const data = ev.dataTransfer.getData('input');
      const el = document.getElementById(data);
      const content = el.innerText;
      this.addInput(content, idx);
    }
  }

  drag(ev, type, idx?, index?) {
    let dataType: string;
    if (type === 0) {
      dataType = 'metric';
    } else if (type === 1) {
      dataType = 'operator';
    } else {
      dataType = 'input';
    }
    ev.dataTransfer.setData(dataType, ev.target.id);
    if (idx !== undefined && index !== undefined) {
      localStorage.setItem('idx', idx);
      localStorage.setItem('index', index);
    }
  }


  addOperator(operator, idx) {
    const myChoice = this.conditions[idx].choice;
    const last = myChoice[myChoice.length - 1];
    if (last && (last.type === 0 || last.type === 2)) {
      const newOperator = { type: 1, value: operator };
      myChoice.push(newOperator);
    } else {
      // error can't drop;
    }
  }

  addInput(input, idx) {
    const myChoice = this.conditions[idx].choice;
    const last = myChoice[myChoice.length - 1];
    if ((myChoice.length === 0 || last.type === 1)) {
      const newOperator = { type: 2, value: '' };
      myChoice.push(newOperator);
    } else {
      // error can't drop;
    }
  }
  addMetric(metric, idx) {
    const myChoice = this.conditions[idx].choice;
    const last = myChoice[myChoice.length - 1];
    if (last && (last.type === 0 || last.type === 2)) {
      // error can't drop;
    } else {
      const newMetric = { type: 0, value: metric };
      myChoice.push(newMetric);
    }
  }

  addChoice() {
    const size = this.conditions.length;
    if (size !== 0) {
      this.conditions[size - 1].gate = 1;
    }
    const newChoice = {
      choice: [],
      gate: null,
      isOpened: true
    };
    this.conditions.push(newChoice);
  }

  changeGate(idx, type) {
    if (type === 0) {
      this.conditions[idx].gate = 0;
    } else { this.conditions[idx].gate = 1; }
  }

  remove(idx, index) {
    const myChoice = this.conditions[idx].choice;
    this.conditions[idx].choice.splice(index, 1);
  }

  deleteCondition(idx) {
    this.conditions.splice(idx, 1);
    if (this.conditions.length > 0) {
      const size = this.conditions.length;
      this.conditions[size - 1].gate = null;
    }
  }

  changeOperationsState(idx) {
    if (this.conditions[idx].isOpened) {
      this.conditions[idx].isOpened = false;
    } else {
      this.conditions[idx].isOpened = true;
    }
  }

  isOperator(value) {
    return (value !== 'AND' && value !== 'OR');
  }

}
