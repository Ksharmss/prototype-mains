import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreMaritalScreeningComponent } from './pre-marital-screening-apply/pre-marital-screening.component';
import { InboxComponent } from './inbox/inbox.component';
import { PreMaritalReviewComponent } from './pre-marital-review/pre-marital-review.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { InboxDownloadComponent } from './inbox-download/inbox-download.component';
import { ListDownloadComponent } from './list-download/list-download.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { PaymentComponent } from './payment/payment.component';
import { FamilyViewComponent } from './family-view/family-view/family-view.component';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent
  },
  {
    path: 'premaritalscreening',
    component: PreMaritalScreeningComponent
  },
  {
    path: 'premaritalreview',
    component: PreMaritalReviewComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'thankyou',
    component: ThankYouComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'reschedule',
    component: RescheduleComponent
  },
  {
    path: 'inboxDownload',
    component: InboxDownloadComponent
  },
  {
    path: 'listdownload',
    component: ListDownloadComponent
  },
  {
    path: 'familyView',
    component: FamilyViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
