import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input('metrics')metrics: any[] = [
    {value: 'Country', id: 'metric1'},
    {value: 'City', id: 'metric2'},
    {value: 'Location_Long', id: 'metric3'},
    {value: 'Location_Lat', id: 'metric4'},
    {value: 'UserName', id: 'metric5'},
    {value: 'Bugs', id: 'metric6'},
    {value: 'LAGORTA', id: 'metric7'},
  ];

  constructor() { }
  searchQuery = '';
  ngOnInit() {

  }
  search() {

  }
  drag(ev) {
      ev.dataTransfer.setData('metric', ev.target.id);
  }


}
