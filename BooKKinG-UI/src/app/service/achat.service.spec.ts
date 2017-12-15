import { TestBed, inject } from '@angular/core/testing';

import { AchatService } from './achat.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AchatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AchatService],
      imports: [ 
        RouterTestingModule,
        HttpModule
      ]
    });
  });

  it('should be created', inject([AchatService], (service: AchatService) => {
    expect(service).toBeTruthy();
  }));
});
