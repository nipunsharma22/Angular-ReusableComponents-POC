import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeFormComponent } from './iframe-form.component';

describe('IframeFormComponent', () => {
  let component: IframeFormComponent;
  let fixture: ComponentFixture<IframeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
