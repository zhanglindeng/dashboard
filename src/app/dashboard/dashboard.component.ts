import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  nav1 = 'user';

  constructor() {
  }

  ngOnInit() {
  }

  nav1Click(s: string) {
    this.nav1 = s;
  }

  nav1Mouseenter(s: string) {
    this.nav1 = s;
  }
}
