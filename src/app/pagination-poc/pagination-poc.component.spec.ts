import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationPocComponent } from './pagination-poc.component';

describe('PaginationPocComponent', () => {
  let component: PaginationPocComponent;
  let fixture: ComponentFixture<PaginationPocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationPocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
