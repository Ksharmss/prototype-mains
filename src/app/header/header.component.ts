import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { AppGlobalService } from '../services/app-global.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  currentLang = '';
  appTitle = '';


  constructor(public translate: TranslateService, private cookieService: CookieService,
    private appGlobals: AppGlobalService, private titleService: Title, private router: Router
  ) {
    this.getObserveValues();
    translate.addLangs(["en", "ar"]);
    translate.setDefaultLang(this.currentLang);
    translate.use(this.currentLang);
    this.setObserveValues(this.currentLang);
  }

  ngOnInit(): void {
  }
  navigate() {
    console.log("navvv", this.router.url)
    if (this.router.url == '/list') {
      this.router.navigateByUrl('/inboxDownload');
    } else {
      this.router.navigateByUrl('/')
    }
  }
  getObserveValues() {
    if (this.cookieService.get('lang')) {
      this.currentLang = this.cookieService.get('lang');
    } else {
      this.appGlobals.defaultLang.subscribe(item => this.currentLang = item);
    }
  }
  changeLang(lang: string) {
    if (lang == 'ar') {
      lang = 'en';
    } else {
      lang = 'ar';
    }
    this.currentLang = lang;
    if (this.cookieService.get('lang')) {
      this.cookieService.remove('lang')
    }
    this.addCookie(this.currentLang);
    this.setObserveValues(lang);
    this.translate.use(this.currentLang);
    this.changeComponentForLang();
  }

  changeComponentForLang() {
    this.translate.getTranslation(this.currentLang).subscribe(langDetails => {
      this.appTitle = langDetails.header.appTitle;
      this.setTitle(this.appTitle)
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  addCookie(language: string) {
    let d: Date = new Date();
    d.setTime(d.getTime() + 0.2 * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    if (environment.stage || environment.production) {
      document.cookie = `${'lang'}=${language};${expires};${''}; SameSite=None; Secure`;
    } else {
      document.cookie = `${'lang'}=${language};${expires};${''};`
    }
  }

  setObserveValues(currentLang: string) {
    this.appGlobals.setLangStatus(currentLang);
  }
}
