import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-conditions',
  templateUrl: './filter-conditions.component.html',
  styleUrls: ['./filter-conditions.component.css']
})
export class FilterConditionsComponent implements OnInit {
  // choice type (0 for meric , 1 for operator)
  // Gate (0 for meric , 1 for operator)
  conditions = [
    {
      choice:[{
        type:0, 
        value:''
      }],
      gate:null  
    }
  ];
  constructor() { }

  ngOnInit() {

  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  drop(ev,idx) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('id');
    const el  = document.getElementById(data);
    ev.target.innerHTML = el.innerHTML;
  }
  addChoice(){
    let size=this.conditions.length;
    this.conditions[size-1].gate=1;
    var newChoice={
      choice:[{
        type:0, 
        value:''
      }],
      gate:null
    }
    this.conditions.push(newChoice);
  }
  changeGate(idx,type){
    if(type==0)
      this.conditions[idx].gate=0;
    else  this.conditions[idx].gate=1;
  }

}
