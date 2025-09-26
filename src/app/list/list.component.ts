import { Component, OnInit } from '@angular/core';
import { AppGlobalService } from '../services/app-global.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  currentLang = 'en';
  savedData;
  paymentDate;

  constructor(private appGlobals: AppGlobalService,
    private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getObserveValues();
    this.savedData = this.dataService.getData();
    this.paymentDate = this.dataService.getPaymentDate();
  }
  getObserveValues() {
    this.appGlobals.defaultLang.subscribe(item => {
      this.currentLang = item;
    });
  }
  book() {
    this.router.navigateByUrl('/premaritalscreening');
  }
  back() {
    this.router.navigateByUrl('/dashboard');
  }
  reschedule() {
    this.router.navigateByUrl('/reschedule');
  }
}
