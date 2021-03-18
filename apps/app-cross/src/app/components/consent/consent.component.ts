import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaymentSaltEdgeObj, PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit{
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();
  paymentData: PaymentSaltEdgeObj;

  constructor(private paymentService: PaymentService) {
  }


  ngOnInit(): void {
    this.paymentData = this.paymentService.getPaymentData();
  }

  cancelButton() {
    this.paymentService.flushData();
    this.buttonClicked.emit('cancel');
  }

  submitButton() {
    this.paymentService.createQueryParams();
  }
}
