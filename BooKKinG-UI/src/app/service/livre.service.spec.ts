import { Livre } from './../model/livre';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './navigation.service';
import { LRUCacheService } from './lrucache.service';
import { TestBed, inject } from '@angular/core/testing';

import { LivreService } from './livre.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('LivreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LivreService, 
        LRUCacheService, 
        NavigationService, 
        CookieService
      ],
      imports: [ 
        RouterTestingModule,
        HttpModule
      ],
    });
  });

  it('should be created', inject([LivreService], (service: LivreService) => {
    expect(service).toBeTruthy();
  }));
  
});
