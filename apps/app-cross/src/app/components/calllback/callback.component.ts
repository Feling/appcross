import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface ResponseFromServer {
  endToEndIdentification: string,
  message: string,
  status: string
}

@Component({
  selector: 'app-callback',
  styleUrls: ['./callback.component.scss'],
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  message;
  responseFromServer: ResponseFromServer;
  title = 'BB Bistro Rapid Pay';

  constructor(private activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe(
      (data: ResponseFromServer) => {
        this.responseFromServer = data
        if (data.status === '1') {
          this.message = 'Thank you, your order have been successfully paid.'
        }
        console.log(data);
      }
    );
  }

}
