import { Injectable } from '@angular/core';

export interface PaymentObj {
  currency: string,
  country: string,
  settlementInstructions: {
    bank: string,
    currency: string,
    correspondent: string
  }
  bank: string,
  amount: string,
  creditorName: string,
  remittanceInformationUnstructured: string
}

export interface PaymentSaltEdgeObj {
  creditorName: string,
  instructedAmount: {
    amount: string,
    currency: string
  },
  remittanceInformationUnstructured: string,
  endToEndIdentification: string,
  creditorAccount: {
    iban: string,
    bic: string
  }
}

export const BankMap = {
  CITIUS33: {
    currency: {
      EUR: 'DEUTDEFF',
      GBR: 'CITIGB2L',
      CAD: 'CITICATTBCH'
    }
  },
  AGRIFRPP: {
    currency: {
      USD: 'CHASUS33'
    }
  }
};

export const currencyPerCountry = {
  France: 'EUR',
  Israel: 'ILS',
  Moldova: 'EURO'
};

export const bankNameToBIC = {
  DEUTDEFF: 'DEUTDEFFXXX',
  AGRIFRPP: 'AGRIFRPP881'
}

export const bankNameToIBAN = {
  DEUTDEFF: 'DE89370400440532013000',
  AGRIFRPP: 'FR7611206000150002052067096'
}

export const BankRates = {
  DEUTDEFF: 0.8400,
  AGRIFRPP: 0.8554
}
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentObj: PaymentObj | null = {
    settlementInstructions: {
      bank: '',
      correspondent: '',
      currency: ''
    },
    country: '',
    currency: '',
    bank: '',
    amount: '',
    creditorName: '',
    remittanceInformationUnstructured: ''
  };

  paymentJson;

  constructor() {
  }

  setProperty(prop, value) {
    this.paymentObj[prop] = value;
  }

  setSettlement(prop, value) {
    this.paymentObj.settlementInstructions[prop] = value;
  }

  setBank(value) {
    this.paymentObj.bank = value;
  }

  setCurrency(value) {
    if (value === 'local') {
     this.paymentObj.currency = currencyPerCountry[this.paymentObj.country]
    } else {
      this.paymentObj.currency = value
    }

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

  preprareJSON() {
    let jsonSaltEdge: PaymentSaltEdgeObj = {
      creditorAccount: { bic: '', iban: '' },
      creditorName: '',
      endToEndIdentification: '',
      instructedAmount: { amount: '', currency: '' },
      remittanceInformationUnstructured: ''

    };
    if ( this.paymentObj.currency === 'EUR') {
      jsonSaltEdge.creditorName = this.paymentObj.creditorName;
      jsonSaltEdge.instructedAmount.currency = this.paymentObj.currency;
      jsonSaltEdge.endToEndIdentification = 'cc5a8022-5e71-460e-82fa-ab0be1997a54';
      jsonSaltEdge.remittanceInformationUnstructured = this.paymentObj.remittanceInformationUnstructured;
      jsonSaltEdge.creditorAccount.iban = bankNameToIBAN[BankMap[this.paymentObj.settlementInstructions.bank].currency[this.paymentObj.currency]];
      jsonSaltEdge.creditorAccount.bic = bankNameToBIC[BankMap[this.paymentObj.settlementInstructions.bank].currency[this.paymentObj.currency]];
      jsonSaltEdge.instructedAmount.amount =  (Number(BankRates[BankMap[this.paymentObj.settlementInstructions.bank].currency[this.paymentObj.currency]]) * Number(this.paymentObj.amount)).toString();

    }

    if (this.paymentObj.currency === 'USD') {
      jsonSaltEdge.creditorName = this.paymentObj.creditorName;
      jsonSaltEdge.instructedAmount.amount = this.paymentObj.amount;
      jsonSaltEdge.instructedAmount.currency = 'EUR';
      jsonSaltEdge.endToEndIdentification = 'cc5a8022-5e71-460e-82fa-ab0be1997a54';
      jsonSaltEdge.remittanceInformationUnstructured = this.paymentObj.remittanceInformationUnstructured;
      jsonSaltEdge.creditorAccount.iban = bankNameToIBAN[this.paymentObj.bank];
      jsonSaltEdge.creditorAccount.bic = bankNameToBIC[this.paymentObj.bank];
      jsonSaltEdge.instructedAmount.amount = (Number(BankRates[this.paymentObj.bank]) * Number(this.paymentObj.amount)).toString();

    }
    console.log(jsonSaltEdge)
    this.paymentJson = jsonSaltEdge;
  }

  getPaymentData() {
    return this.paymentJson;
  }
}
