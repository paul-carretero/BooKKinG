import { LRUCacheService } from './lrucache.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './navigation.service';
import { TestBed, inject } from '@angular/core/testing';

import { HistoriquePagesService } from './historique-pages.service';

describe('HistoriquePagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HistoriquePagesService,
        NavigationService,
        CookieService,
        LRUCacheService
      ]
    });
  });

  it('should be created', inject([HistoriquePagesService], (service: HistoriquePagesService) => {
    expect(service).toBeTruthy();
  }));
});
