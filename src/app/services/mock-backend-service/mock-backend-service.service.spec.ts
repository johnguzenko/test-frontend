import { TestBed } from '@angular/core/testing';

import { MockBackendServiceService } from './mock-backend-service.service';

describe('MockBackendServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockBackendServiceService = TestBed.get(MockBackendServiceService);
    expect(service).toBeTruthy();
  });
});
