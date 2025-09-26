import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobalService } from '../services/app-global.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  currentLang = 'en';
  savedData;
  cards = [
    {
      id: 'PREMARITAL_SCREENING',
      docIcon: 'fa-solid fa-vials',
      status: 'pending',
      header: 'preMarital.title',
      entity: 'common.ehs',
      hasFooterIcon: true,
      count: 1,
      isEnabaled: true
    },
    {
      id: 'MARRIAGE_CERTIFICATE',
      docIcon: 'ui-marriage',
      status: 'pending',
      header: 'dashboard.marriageDetails',
      entity: 'common.moj',
      hasFooterIcon: true,
      count: 0,
      isEnabaled: false
    },
    {
      id: 'FAMILY_BOOK',
      docIcon: 'ui-familybook',
      status: 'pending',
      header: 'dashboard.familyBook',
      entity: 'common.icp',
      hasFooterIcon: true,
      count: 0,
      isEnabaled: false
    },
    {
      id: 'HOUSING_GRANT',
      docIcon: 'ui-housing-grant',
      status: 'pending',
      header: 'dashboard.housingGrant',
      entity: 'common.ehs',
      hasFooterIcon: true,
      count: 0,
      isEnabaled: false
    },
    {
      id: 'HOUSING_ALLOWANCE',
      docIcon: 'ui-housing-grant',
      status: 'pending',
      header: 'dashboard.housingAllowance',
      entity: 'common.fujhr',
      hasFooterIcon: true,
      count: 0,
      isEnabaled: false
    },
    {
      id: 'MARRIAGE_GRANT',
      docIcon: 'ui-marriage-grant',
      status: 'pending',
      header: 'dashboard.marriageGrant',
      entity: 'common.mocd',
      hasFooterIcon: true,
      count: 0,
      isEnabaled: false
    },
    {
      id: 'MABROOK_MA_YAK',
      docIcon: 'ui-nbb',
      status: 'pending',
      header: 'dashboard.mabroukMaYak',
      entity: 'common.icp',
      hasFooterIcon: true,
      count: 0,
      isEnabaled: false
    },
    {
      id: 'DEV_SURVEY',
      docIcon: 'ui-survey',
      status: 'pending',
      header: 'dashboard.developmentSurvey',
      entity: 'common.mocd',
      hasFooterIcon: true,
      count: 0,
      isEnabaled: false
    },
  ]

  constructor(private appGlobals: AppGlobalService,
    private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getObserveValues();
    this.savedData = this.dataService.getData();
  }
  getObserveValues() {
    this.appGlobals.defaultLang.subscribe(item => {
      this.currentLang = item;
    });
  }

  viewDetails(card) {
    if (card.id == 'PREMARITAL_SCREENING') {
      this.router.navigateByUrl('/list')
    }
  }
}
