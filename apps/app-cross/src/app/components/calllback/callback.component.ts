import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface ResponseFromServer {
  endToEndIdentification: string,
  message: string,
  status: 1
}

@Component({
  selector: 'app-callback',
  styleUrls: ['./callback.component.scss'],
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  responseFromServer: ResponseFromServer;
  constructor(private activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe(
      (data: ResponseFromServer) => {
        this.responseFromServer = data
        console.log(data);
      }
    );
  }

}
