import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootTabsComponent } from './root-tabs.component';

describe('RootTabsComponent', () => {
  let component: RootTabsComponent;
  let fixture: ComponentFixture<RootTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
