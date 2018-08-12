import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-conditions',
  templateUrl: './filter-conditions.component.html',
  styleUrls: ['./filter-conditions.component.css']
})
export class FilterConditionsComponent implements OnInit {
  choices = [
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
    },
    {
      choice: [
        {
          type: 1,	// (0 for meric , 1 for operator)
          value: '2'	//
        }
      ],
      gate: null // (0 for and , 1 for or) gate for next choice
      },
    {
      choice: [
        {
          type: null,	// (0 for meric , 1 for operator)
          value: 'Running data'	//
        }
      ],
      gate: null // (0 for and , 1 for or) gate for next choice
      },
  ];

  constructor() { }

  ngOnInit() {

  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('id');
    const el  = document.getElementById(data);
    ev.target.innerHTML = el.innerHTML;
  }
  removeMetric($event) {
    $event.target.classList.toggle('display');
  }

}
