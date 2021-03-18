import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  styleUrls: ['./container.component.scss'],
  templateUrl: './container.component.html'
})
export class ContainerComponent {

  isConsent = false;
  constructor() {
  }

  title = 'BB Bistro Rapid Pay';

  setConsentView() {
    this.isConsent = true;
  }

  onButtonConsentClicked(event) {
    if (event === 'cancel') {
      this.isConsent = false;
    }
    if (event ===  'submit') {

    }
  }
}
