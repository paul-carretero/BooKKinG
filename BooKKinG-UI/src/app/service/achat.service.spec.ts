import { TestBed, inject } from '@angular/core/testing';

import { AchatService } from './achat.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './navigation.service';
import { LRUCacheService } from './lrucache.service';
import { PanierService } from './panier.service';
import { ConnectionService } from './connection.service';
import { NotifService } from './notif.service';

describe('AchatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AchatService,
        NavigationService,
        CookieService,
        LRUCacheService,
        PanierService,
        ConnectionService,
        NotifService
      ],
      imports: [
        RouterTestingModule,
        HttpModule
      ],

    });
  });

  it('should be created', inject([AchatService], (service: AchatService) => {
    expect(service).toBeTruthy();
  }));
});
