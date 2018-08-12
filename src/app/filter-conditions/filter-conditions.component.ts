import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-conditions',
  templateUrl: './filter-conditions.component.html',
  styleUrls: ['./filter-conditions.component.css']
})
export class FilterConditionsComponent implements OnInit {
  conditions = [];
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

}
