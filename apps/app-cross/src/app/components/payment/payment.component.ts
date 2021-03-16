import { Component } from '@angular/core';


@Component({
  selector: 'app-payment',
  styleUrls: ['payment.component.scss'],
  templateUrl: './payment.component.html'
})
export class PaymentComponent {
  pickCurr = true;
  selectedValue: string;

  countries = [
    {value: 'France', viewValue: 'France', currency: 'ERU'},
    {value: 'Moldova', viewValue: 'Moldova', currency: 'ERU'},
    {value: 'Israel', viewValue: 'Israel', currency: 'ERU'}
  ]
  constructor() {
  }

  pickCurrency(type: string) {
    this.pickCurr = !this.pickCurr
  }
}
