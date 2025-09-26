import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobalService } from '../services/app-global.service';

@Component({
  selector: 'app-inbox-download',
  templateUrl: './inbox-download.component.html',
  styleUrls: ['./inbox-download.component.less']
})
export class InboxDownloadComponent implements OnInit {

  currentLang = 'en';

  constructor(private appGlobals: AppGlobalService, private router: Router) { }

  ngOnInit(): void {
    this.getObserveValues();
  }
  getObserveValues() {
    this.appGlobals.defaultLang.subscribe(item => {
      this.currentLang = item;
    });
  }
  navigate() {
    this.router.navigateByUrl('/listdownload');
  }
  book() {
    this.router.navigateByUrl('/premaritalscreening');
  }
}
