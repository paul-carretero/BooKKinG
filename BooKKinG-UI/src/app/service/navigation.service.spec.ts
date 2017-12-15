import { CookieService } from 'ngx-cookie-service';
import { TestBed, inject } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        CookieService
      ]
    });
  });

  it('should be created', inject([NavigationService], (service: NavigationService) => {
    expect(service).toBeTruthy();
  }));
});
