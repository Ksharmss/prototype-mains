import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMaritalReviewComponent } from './pre-marital-review.component';

describe('PreMaritalReviewComponent', () => {
  let component: PreMaritalReviewComponent;
  let fixture: ComponentFixture<PreMaritalReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreMaritalReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMaritalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
