import { Injectable } from '@angular/core';

export interface PaymentObj {
  currency: string,
  country: string,
  settlementInstructions: {
    bank: string,
    currency: string,
    correspondent: string
  }
  bank: {
    name: string,
    fromCCY: string,
    toCCY: string,
    rate: number,
    expDate: string
  }
}

export const BankMap = {
  CITIUS33: {
    currency: {
      EUR: 'DEUTDEFF',
      GBR: 'CITIGB2L',
      CAD: 'CITICATTBCH'
    }
  }
};

export const currencyPerCountry = {
  France: 'EUR',
  Israel: 'ILS',
  Moldova: 'EURO'
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentObj: PaymentObj | null = {
    bank: {
      name: '',
      fromCCY: '',
      toCCY: '',
      rate: 0,
      expDate: ''
    },
    settlementInstructions: {
      bank: '',
      correspondent: '',
      currency: ''
    },
    country: '',
    currency: ''
  };

  constructor() {
  }

  setProperty(prop, value) {
    this.paymentObj[prop] = value;
  }

  setSettlement(prop, value) {
    this.paymentObj.settlementInstructions[prop] = value;
  }

  setBank(prop, value) {
    this.paymentObj.bank[prop] = value;
  }

  getCorrespondent() {
    if (this.paymentObj.currency === 'local') {
      this.paymentObj.currency = currencyPerCountry[this.paymentObj.country];
    } else {
      this.paymentObj.currency = 'USD';
    }
    let corrsBank = BankMap[this.paymentObj.settlementInstructions.bank].currency[this.paymentObj.currency];
    if (corrsBank) {
      this.paymentObj.settlementInstructions.correspondent = corrsBank;
    }
    this.paymentObj.settlementInstructions.currency =  this.paymentObj.currency;
      console.log(this.paymentObj)
  }
}
