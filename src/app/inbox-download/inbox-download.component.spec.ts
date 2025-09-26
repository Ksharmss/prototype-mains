import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxDownloadComponent } from './inbox-download.component';

describe('InboxDownloadComponent', () => {
  let component: InboxDownloadComponent;
  let fixture: ComponentFixture<InboxDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
