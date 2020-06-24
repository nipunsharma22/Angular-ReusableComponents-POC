import { TestBed } from '@angular/core/testing';

import { ScreenDisplayService } from './screen.display.service';

describe('Screen.DisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScreenDisplayService = TestBed.get(ScreenDisplayService);
    expect(service).toBeTruthy();
  });
});
