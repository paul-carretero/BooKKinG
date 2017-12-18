import { LRUCacheService } from './lrucache.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './navigation.service';
import { TestBed, inject } from '@angular/core/testing';

import { HistoriquePagesService } from './historique-pages.service';
import { NavigationData } from '../model/navigation-data';
import { Globals } from '../globals';

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

  it('possible de retourner', inject([HistoriquePagesService,NavigationService], (service: HistoriquePagesService, serviceNav:NavigationService) => {
    serviceNav.setCurrentPage(2);
    serviceNav.setCurrentPage(3);
    const retourner = service.canGoBack();
    const retourner_valide = true;
    expect(retourner).toEqual(retourner_valide);
  }));

  it('impossible de retourner', inject([HistoriquePagesService,NavigationService], (service: HistoriquePagesService, serviceNav:NavigationService) => {
    const retourner = service.canGoBack();
    const retourner_valide = false;
    expect(retourner).toEqual(retourner_valide);
  }));

  it('naviguer page précédente', inject([HistoriquePagesService,NavigationService], (service: HistoriquePagesService, serviceNav:NavigationService) => {
    serviceNav.setCurrentPage(2);
    serviceNav.setCurrentPage(3);
    let page_courante = service.navPagePrecedente();
    expect(page_courante.nPage).toEqual(2);

  }));
});
