import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatePickerHeaderComponent } from './custom-date-picker-header.component';

describe('CustomDatePickerHeaderComponent', () => {
  let component: CustomDatePickerHeaderComponent;
  let fixture: ComponentFixture<CustomDatePickerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDatePickerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDatePickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
