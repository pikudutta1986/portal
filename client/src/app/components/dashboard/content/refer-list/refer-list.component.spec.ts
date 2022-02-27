import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferListComponent } from './refer-list.component';

describe('ReferListComponent', () => {
  let component: ReferListComponent;
  let fixture: ComponentFixture<ReferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
