import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  transferTitle="<strong>Make</strong> Transfer";
  historyTitle="Transaction <strong>List</strong>";
  
  constructor() { }

  ngOnInit(): void {
  }

}
