import { Component } from '@angular/core';


@Component({
  selector: 'app-payment',
  styleUrls: ['payment.component.scss'],
  templateUrl: './payment.component.html'
})
export class PaymentComponent {
  pickCurr = true;
  constructor() {
  }

  pickCurrency(type: string) {
    this.pickCurr = !this.pickCurr
  }
}
