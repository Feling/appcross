import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  styleUrls: ['payment.component.scss'],
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  pickCurr = true;
  selectedValue: string;
  merchData;
  countries = [
    { value: 'France', viewValue: 'France', currency: 'ERU' },
    { value: 'Moldova', viewValue: 'Moldova', currency: 'ERU' },
    { value: 'Israel', viewValue: 'Israel', currency: 'ERU' }
  ];

  constructor(private paymentService: PaymentService,
              private activatedroute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe(
      (data) => {
        console.log(data);
        this.merchData = data;
        this.paymentService.setSettlement('bank', data['bank']);
      }
    );
  }

  pickCurrency(type: string) {
    this.paymentService.setProperty('currency', type);
    this.pickCurr = !this.pickCurr;
  }

  selectedCountryChange(value) {
    this.paymentService.setProperty('country', value);
    this.paymentService.getCorrespondent();
  }
}
