import { Component, EventEmitter, Output } from '@angular/core';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent {

  selectedValue: string;
  isSelectBank = false;
  @Output() bankSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private paymentService: PaymentService
  ) {
  }

  countries = [
    { value: 'France', viewValue: 'France', currency: 'ERU' },
    { value: 'Moldova', viewValue: 'Moldova', currency: 'ERU' },
    { value: 'Israel', viewValue: 'Israel', currency: 'ERU' }
  ];

  banks = [
    { value: 'AGRIFRPP', viewValue: 'Fake Bank', currency: 'ERU' }
  ];

  selectedCountryChange(value) {
    this.paymentService.setProperty('country', value);
    this.isSelectBank = true;
    // this.paymentService.getCorrespondent();
  }

  selectedBankChange(value) {
    this.paymentService.setBank(value);
    this.bankSelected.emit(true)
  }
}
