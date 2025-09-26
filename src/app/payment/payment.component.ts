import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobalService } from '../services/app-global.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {

  currentLang = 'en';
  constructor(private router: Router, private appGlobals: AppGlobalService,) { }

  ngOnInit(): void {
    this.getObserveValues();
  }
  getObserveValues() {
    this.appGlobals.defaultLang.subscribe(item => {
      this.currentLang = item;
    });
  }

  cancel() {
    this.router.navigateByUrl('/premaritalreview');
  }
  pay() {
    this.router.navigateByUrl('/thankyou')
  }
}
