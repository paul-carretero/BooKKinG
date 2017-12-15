import { TestBed, inject } from '@angular/core/testing';

import { LRUCacheService } from './lrucache.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('LrucacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LRUCacheService],
    });
  });

  it('should be created', inject([LRUCacheService], (service: LRUCacheService) => {
    expect(service).toBeTruthy();
  }));
});
