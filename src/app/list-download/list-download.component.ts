import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobalService } from '../services/app-global.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list-download',
  templateUrl: './list-download.component.html',
  styleUrls: ['./list-download.component.less']
})
export class ListDownloadComponent implements OnInit {

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
    this.router.navigateByUrl('/inboxDownload');
  }
  download() {
    // Path to the PDF in the assets folder
    const pdfPath = 'assets/pdf/sample.pdf';

    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute to the path of the PDF file
    link.href = pdfPath;

    // Set the download attribute to mimic the download behavior
    link.download = 'example.pdf'; // Name of the downloaded file

    // Open the PDF in a new tab
    window.open(pdfPath, '_blank');

    // Trigger the download action
    link.click();
  }

}
