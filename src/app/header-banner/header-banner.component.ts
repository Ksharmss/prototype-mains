import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.less']
})
export class HeaderBannerComponent implements OnInit {
  @Input() pageTitle = '';
  constructor() { }

  ngOnInit(): void {
  }

}
