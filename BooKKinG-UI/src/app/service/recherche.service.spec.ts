import { LRUCacheService } from './lrucache.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './navigation.service';
import { TestBed, inject } from '@angular/core/testing';

import { RechercheService } from './recherche.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('RechercheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RechercheService, 
        NavigationService,
        CookieService,
        LRUCacheService
      ],
      imports: [ 
        RouterTestingModule,
        HttpModule
      ]
    });
  });

  it('should be created', inject([RechercheService], (service: RechercheService) => {
    expect(service).toBeTruthy();
  }));
});
