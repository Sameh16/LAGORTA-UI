import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-conditions',
  templateUrl: './filter-conditions.component.html',
  styleUrls: ['./filter-conditions.component.css']
})
export class FilterConditionsComponent implements OnInit {
  conditions = [
    {
      choice: [
        {
          type: 0,
          value: ''
        }
      ],
      gate: null, // (0 for and , 1 for or) gate for next choice
      isOpened: true // el operators list
    }
    // {
    //   choice: [
    //     {
    //       type: 1,	// (0 for meric , 1 for operator)
    //       value: '2'	//
    //     }
    //   ],
    //   gate: null // (0 for and , 1 for or) gate for next choice
    // },
    // {
    //   choice: [
    //     {
    //       type: null,	// (0 for meric , 1 for operator)
    //       value: 'Running data'	//
    //     }
    //   ],
    //   gate: null // (0 for and , 1 for or) gate for next choice
    // }
  ];

  operators = [
    [{ value: '/', id: 'op1' }, { value: '%', id: 'op2' },
    { value: '-', id: 'op3' }, { value: 'x', id: 'op4' }, { value: '+', id: 'op5' }],
    [{ value: '=', id: 'op10' }, { value: '!=', id: 'op9' }, { value: '>', id: 'op6' },
    { value: '>=', id: 'op11' }, { value: '<', id: 'op8' }, { value: '<=', id: 'op7' }]
  ];
  constructor() { }

  ngOnInit() {

  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop2(ev, idx, index) {
    const data = ev.dataTransfer.getData('metric');
    const el = document.getElementById(data);
    const content = el.innerText;
    const myChoice = this.conditions[idx].choice[index];
    myChoice.type = 0;
    myChoice.value = content;
  }

  drop(ev, idx) {
    ev.preventDefault();
    if (ev.dataTransfer.getData('metric') !== '') {
      const data = ev.dataTransfer.getData('metric');
      const el = document.getElementById(data);
      const content = el.innerText;
      this.addMetric(content, idx);

    } else {
      const data = ev.dataTransfer.getData('operator');
      const el = document.getElementById(data);
      const content = el.innerText;
      this.addOperator(content, idx);
    }

    // this.conditions[idx].choice.push({ type: 0, value: content });
  }

  drag(ev) {
    ev.dataTransfer.setData('operator', ev.target.id);
  }

  private addOperator(operator, idx) {
    const myChoice = this.conditions[idx].choice;
    const last = myChoice[myChoice.length - 1];
    if (last && last.type === 0) {
      const newOperator = { type: 1, value: operator };
      myChoice.push(newOperator);
    } else {
      // error can't drop;
      alert('error');
    }
  }

  private addMetric(metric, idx) {
    const myChoice = this.conditions[idx].choice;
    const last = myChoice[myChoice.length - 1];
    if (last && last.type === 0) {
      // error can't drop;
      alert('error');
    } else if (last && last.type === null) {
      last.type = 0;
      last.value = metric;
    } else {
      const newMetric = { type: 0, value: metric };
      myChoice.push(newMetric);
    }
  }

  addChoice() {
    const size = this.conditions.length;
    this.conditions[size - 1].gate = 1;
    const newChoice = {
      choice: [{
        type: 0,
        value: ''
      }],
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
    if (myChoice.length > 1) {
      myChoice[index].type = null;
    } else {
      this.conditions[idx].choice.splice(index, 1);
    }
  }

  removeOperator($event, idx, index) {
    const myChoice = this.conditions[idx].choice;
    console.log(myChoice[index + 1]);
    if (!myChoice[index + 1]) {

      myChoice[index].type = null;
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

}
