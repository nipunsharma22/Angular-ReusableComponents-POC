import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeditorformComponent } from './customeditorform.component';

describe('CustomeditorformComponent', () => {
  let component: CustomeditorformComponent;
  let fixture: ComponentFixture<CustomeditorformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeditorformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeditorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
