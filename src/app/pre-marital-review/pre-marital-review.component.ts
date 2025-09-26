import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobalService } from '../services/app-global.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pre-marital-review',
  templateUrl: './pre-marital-review.component.html',
  styleUrls: ['./pre-marital-review.component.less']
})
export class PreMaritalReviewComponent implements OnInit {

  currentLang = 'en';
  savedData;
  //   {
  //     "userEmiratesId": "7841988754364738",
  //     "medicalHistory": {
  //         "question1": "Y",
  //         "question2": "N",
  //         "question3": "N",
  //         "question4": "N",
  //         "question5": "N",
  //         "question6": "N",
  //         "question7": "N"
  //     },
  //     "partnerEmiratesId": "754",
  //     "partnerFullNameEn": "Ahmed Hussain",
  //     "partnerFullNameAr": "احمد حسين",
  //     "appointmentDetails": {
  //         "emirate": {
  //             "emirateCode": "4237235",
  //             "emirateNameEn": "Dubai",
  //             "emirateNameAr": "دبي"
  //         },
  //         "healthCenter": {
  //             "id": "awir",
  //             "healthCenterEn": "Al Awir Health Center",
  //             "healthCenterAr": "مركز العوير الصحي"
  //         },
  //         "doctor": {
  //             "id": "doc1",
  //             "doctorEn": "Dr. Esraa",
  //             "doctorAr": "دكتورة إسراء"
  //         },
  //         "date": "2025-01-20T20:00:00.000Z"
  //     },
  //     "selectedTimeSlot": "12:00 AM"
  // }
  constructor(private appGlobals: AppGlobalService,
    private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getObserveValues();
    this.savedData = this.dataService.getData();
    console.log("saveddata", this.savedData)
  }
  getObserveValues() {
    this.appGlobals.defaultLang.subscribe(item => {
      this.currentLang = item;
    });
  }

  previousStep(step) {

  }
  pay() {
    this.router.navigateByUrl('/payment')
  }
}
