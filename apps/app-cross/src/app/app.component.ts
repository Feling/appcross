import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appcross-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Cross Border Payments!';

  constructor() {
  }

  ngOnInit() {
  }
}
