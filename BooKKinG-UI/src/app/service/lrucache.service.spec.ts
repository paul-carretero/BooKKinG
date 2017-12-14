import { TestBed, inject } from '@angular/core/testing';

import { LrucacheService } from './lrucache.service';

describe('LrucacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LrucacheService]
    });
  });

  it('should be created', inject([LrucacheService], (service: LrucacheService) => {
    expect(service).toBeTruthy();
  }));
});
