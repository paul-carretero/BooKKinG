import { TestBed, inject } from '@angular/core/testing';

import { AchatService } from './achat.service';

describe('AchatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AchatService]
    });
  });

  it('should be created', inject([AchatService], (service: AchatService) => {
    expect(service).toBeTruthy();
  }));
});
