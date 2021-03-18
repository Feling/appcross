import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-currency-select',
  styleUrls: ['./currency-select.component.scss'],
  templateUrl: './currency-select.component.html'
})
export class CurrencySelectComponent implements OnInit{

  @Output() currencySelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  amountPerCurr;

  constructor(private paymentService: PaymentService) {
  }

  pickCurrency(type: string) {
    this.paymentService.setCurrency(type);
    this.currencySelected.emit(true);
  }

  ngOnInit(): void {
    this.amountPerCurr = this.paymentService.calculateLocalAndUsd();
  }
}
