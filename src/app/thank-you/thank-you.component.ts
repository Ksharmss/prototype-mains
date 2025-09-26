import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobalService } from '../services/app-global.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.less']
})
export class ThankYouComponent implements OnInit {

  currentLang = 'en';
  savedData;
  today = new Date();
  constructor(private appGlobals: AppGlobalService,
    private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getObserveValues();
    this.savedData = this.dataService.getData();
    this.dataService.setPaymentDate(this.today);
  }
  getObserveValues() {
    this.appGlobals.defaultLang.subscribe(item => {
      this.currentLang = item;
    });
  }
  navigate() {
    this.router.navigateByUrl('/dashboard')
  }
}
