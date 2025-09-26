import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMaritalScreeningComponent } from './pre-marital-screening.component';

describe('PreMaritalScreeningComponent', () => {
  let component: PreMaritalScreeningComponent;
  let fixture: ComponentFixture<PreMaritalScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreMaritalScreeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMaritalScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
