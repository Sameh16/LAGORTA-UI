import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input('metrics')metrics: any[] = [
    {value: 'test1', id: 'metric1'},
    {value: 'test2', id: 'metric2'},
    {value: 'test3', id: 'metric3'},
    {value: 'test4', id: 'metric4'},
    {value: 'test5', id: 'metric5'},
    {value: 'test6', id: 'metric6'},
    {value: 'test7', id: 'metric7'},
  ];

  constructor() { }

  ngOnInit() {

  }

allowDrop(ev) {
    ev.preventDefault();
}

drag(ev) {
    ev.dataTransfer.setData('id', ev.target.id);
}

drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('id');
    const el  = document.getElementById(data);
    ev.target.innerHTML = el.innerHTML;

}

}
