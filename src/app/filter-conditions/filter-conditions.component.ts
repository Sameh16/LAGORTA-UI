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
          type: 0,	// (0 for meric , 1 for operator)
          value: 'Running data'	//
        },
        {
          type: 1,	// (0 for meric , 1 for operator)
          value: '2'	//
        },
        {
          type: null,	// (0 for meric , 1 for operator)
          value: 'Running data'	//
        },
      ],
      gate: null // (0 for and , 1 for or) gate for next choice
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

  constructor() { }

  ngOnInit() {

  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  drop(ev, idx) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('id');
    const el = document.getElementById(data);
    const content = el.innerText;
    this.conditions[idx].choice.push({type: 0, value: content});
  }

  addChoice() {
    const size = this.conditions.length;
    this.conditions[size - 1].gate = 1;
    const newChoice = {
      choice: [{
        type: 0,
        value: ''
      }],
      gate: null
    };
    this.conditions.push(newChoice);
  }
  changeGate(idx, type) {
    if (type === 0) {
      this.conditions[idx].gate = 0;
    } else { this.conditions[idx].gate = 1; }
  }
  removeMetric($event) {
    $event.target.classList.toggle('display');
  }

}
