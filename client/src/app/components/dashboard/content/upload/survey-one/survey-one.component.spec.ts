import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyOneComponent } from './survey-one.component';

describe('SurveyOneComponent', () => {
  let component: SurveyOneComponent;
  let fixture: ComponentFixture<SurveyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
