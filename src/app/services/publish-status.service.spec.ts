import { TestBed } from '@angular/core/testing';

import { PublishStatusService } from './publish-status.service';

describe('PublishStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublishStatusService = TestBed.get(PublishStatusService);
    expect(service).toBeTruthy();
  });
});
