import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphformComponent } from './graphform.component';

describe('GraphformComponent', () => {
  let component: GraphformComponent;
  let fixture: ComponentFixture<GraphformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
