import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-conditions',
  templateUrl: './filter-conditions.component.html',
  styleUrls: ['./filter-conditions.component.css']
})
export class FilterConditionsComponent implements OnInit {
  newMetric = [];
  conditions = [
    {
      choice: [
        // {
        //   type: 0, // 0 for metric , 1 for operator , 2 for input
        //   value: ''
        // }
      ],
      gate: null, // (0 for and , 1 for or) gate for next choice
      isOpened: true // el operators list
    }
  ];

  operators = [
    [{ value: '/', id: 'op1' }, { value: '%', id: 'op2' },
    { value: '-', id: 'op3' }, { value: 'x', id: 'op4' }, { value: '+', id: 'op5' }],
    [{ value: '=', id: 'op10' }, { value: '!=', id: 'op9' }, { value: '>', id: 'op6' },
    { value: '>=', id: 'op11' }, { value: '<', id: 'op8' }, { value: '<=', id: 'op7' }]
  ];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i <= 500; i++) {
      const tmpList = [];
      for (let j = 0; j <= 500; j++) {
        tmpList.push('');
      }
      this.newMetric.push(tmpList);
    }
    console.log(this.newMetric.length + ' ---> ' + this.newMetric[0].length);
  }
  onChangeInput(idx, index) {
    this.conditions[idx].choice[index].type = 2;
    this.conditions[idx].choice[index].value = this.newMetric[idx][index];
  }
  // addInput(idx) {
  //   const size = this.conditions[idx].choice.length;
  //   if (this.newMetric.length !== 0 && this.conditions[idx].choice[size - 1].type === 1) {
  //     this.conditions[idx].choice.push({
  //       type: 0,
  //       value: this.newMetric[idx]
  //     }
  //     );
  //   }
  //   this.newMetric[idx] = '';
  // }
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
      console.log('Error');
      return;
    }
    let newChoice;
    if ( localStorage.getItem('idx') !== '') {
      const tmpIdx = localStorage.getItem('idx');
      const tmpIndex = localStorage.getItem('index');
      newChoice = {...this.conditions[tmpIdx].choice[tmpIndex]};
      this.conditions[tmpIdx].choice.splice(tmpIndex, 1);
      localStorage.clear();
    }
    const el = document.getElementById(data);
    const myChoice = this.conditions[idx].choice;
    if (newChoice === undefined) {
      newChoice = { type: newType, value: el.innerText };
    }
    myChoice.splice(index, 0, newChoice);
  }

  drop(ev, idx) {
    ev.preventDefault();
    console.log(ev);

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

  dragInput(ev, idx?, index?) {
    console.log('drag Input', ev.target.id);
    ev.dataTransfer.setData('input', ev.target.id);
    if (idx !== undefined) {
      localStorage.setItem('idx', idx);
      localStorage.setItem('index', index);
    }
  }

  dragMetric(ev, idx?, index?) {
    console.log('drag Metric', ev.target.id);
    ev.dataTransfer.setData('metric', ev.target.id);
    if (idx !== undefined) {
      localStorage.setItem('idx', idx);
      localStorage.setItem('index', index);
    }
  }

  dragOperator(ev, idx?, index?) {
    console.log('drag Operator', ev.target.id);
    ev.dataTransfer.setData('operator', ev.target.id);
    if (idx !== undefined) {
      localStorage.setItem('idx', idx);
      localStorage.setItem('index', index);
    }
  }

  private addOperator(operator, idx) {
    const myChoice = this.conditions[idx].choice;
    const last = myChoice[myChoice.length - 1];
    if (last && (last.type === 0 || last.type === 2)) {
      const newOperator = { type: 1, value: operator };
      myChoice.push(newOperator);
    } else {
      // error can't drop;
    }
  }

  private addInput(input, idx) {
    const myChoice = this.conditions[idx].choice;
    const last = myChoice[myChoice.length - 1];
    if ((myChoice.length === 0 || last.type === 1)) {
      const newOperator = { type: 2, value: input };
      myChoice.push(newOperator);
    } else {
      // error can't drop;
    }
  }

  private addMetric(metric, idx) {
    const myChoice = this.conditions[idx].choice;
    const last = myChoice[myChoice.length - 1];
    if (last && last.type === 0) {
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

  removeMetric($event, idx, index) {
    const myChoice = this.conditions[idx].choice;
    this.conditions[idx].choice[index] = this.newMetric[idx][index] = '';
    if (myChoice.length > 1) {
      this.conditions[idx].choice.splice(index, 1);
    } else {
      this.conditions[idx].choice.splice(index, 1);
    }
  }

  removeOperator($event, idx, index) {
    const myChoice = this.conditions[idx].choice;
    console.log(myChoice[index + 1]);
    if (!myChoice[index + 1]) {
      myChoice.splice(index, 1);
    }
    myChoice.splice(index, 1);
  }

  deleteCondition(idx) {
    console.log(idx);
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

  removeItem(item, myChoice: any) {
    myChoice.splice(myChoice.indexOf(item), 1);
  }
}
