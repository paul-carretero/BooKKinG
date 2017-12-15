import { TestBed, inject } from '@angular/core/testing';

import { HistoriquePagesService } from './historique-pages.service';

describe('HistoriquePagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoriquePagesService]
    });
  });

  it('should be created', inject([HistoriquePagesService], (service: HistoriquePagesService) => {
    expect(service).toBeTruthy();
  }));
});
