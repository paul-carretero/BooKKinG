import { TestBed, inject } from '@angular/core/testing';

import { LivreService } from './livre.service';

describe('LivreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LivreService]
    });
  });

  it('should be created', inject([LivreService], (service: LivreService) => {
    expect(service).toBeTruthy();
  }));
});
