import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  styleUrls: ['payment.component.scss'],
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  @Output() isConsent: EventEmitter<boolean> = new EventEmitter<boolean>();

  pickCurr = true;
  merchData;
  isBankSelected = false;
  isCurrencySelect = false;

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
        this.paymentService.setProperty('creditorName', data['creditorName']);
        this.paymentService.setProperty('amount', data['amount']);
        this.paymentService.setProperty('remittanceInformationUnstructured', data['remittanceInformationUnstructured']);
      }
    );
  }

  bankSelected(bool) {
    this.isBankSelected = bool;
    this.isCurrencySelect = true;
  }

  currencySelected(event) {
    this.paymentService.preprareJSON();
    this.isCurrencySelect = false;
    // this.isConsent.emit(true);
    this.paymentService.createQueryParams();
  }
}
