import { TestBed } from '@angular/core/testing';

import { GlobalEventManagerService } from './global-event-manager.service';

describe('GlobalEventManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalEventManagerService = TestBed.get(GlobalEventManagerService);
    expect(service).toBeTruthy();
  });
});
