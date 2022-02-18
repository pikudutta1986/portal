import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTwoComponent } from './survey-two.component';

describe('SurveyTwoComponent', () => {
  let component: SurveyTwoComponent;
  let fixture: ComponentFixture<SurveyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
