import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { PreMaritalScreeningComponent } from './pre-marital-screening-apply/pre-marital-screening.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { COOKIE_OPTIONS, CookieModule, CookieService } from 'ngx-cookie';
import { PreMaritalReviewComponent } from './pre-marital-review/pre-marital-review.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { InboxDownloadComponent } from './inbox-download/inbox-download.component';
import { ListComponent } from './list/list.component';
import { ListDownloadComponent } from './list-download/list-download.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './payment/payment.component';

export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http,
    [
      { prefix: environment.translatepath, suffix: '.json' }
    ])
}

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = 'ar'
      translate.setDefaultLang('ar');
      translate.use(langToSet).subscribe(() => {
        console.info(`Successfully initialized '${langToSet}' language.`);
      }, err => {
        console.error(`Problem with ${langToSet} language initialization`);
      }, () => {
        resolve(null);
      })
    })
  })
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderBannerComponent,
    PreMaritalScreeningComponent,
    PreMaritalReviewComponent,
    ThankYouComponent,
    DashboardComponent,
    InboxComponent,
    RescheduleComponent,
    InboxDownloadComponent,
    ListComponent,
    ListDownloadComponent,
    PaymentComponent
  ],
  imports: [
    MatNativeDateModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatRadioModule,
    MatChipsModule,
    MatBadgeModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    CookieModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToastContainerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
      tapToDismiss: false,
      positionClass: 'toast-top-center'
    })
  ],
  providers: [
    // CookieService,
    // { provide: COOKIE_OPTIONS, useValue: {} },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
