import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobalService } from '../services/app-global.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.less']
})
export class InboxComponent implements OnInit {

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
    this.router.navigateByUrl('/premaritalscreening');
  }
}
