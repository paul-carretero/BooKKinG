import { TestBed, inject } from '@angular/core/testing';

import { AdministrationService } from './administration.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('AdministrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrationService],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
    });
  });

  it('should be created', inject([AdministrationService], (service: AdministrationService) => {
    expect(service).toBeTruthy();
  }));
});
