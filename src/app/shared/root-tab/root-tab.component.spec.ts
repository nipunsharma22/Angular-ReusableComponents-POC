import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootTabComponent } from './root-tab.component';

describe('RootTabComponent', () => {
  let component: RootTabComponent;
  let fixture: ComponentFixture<RootTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
