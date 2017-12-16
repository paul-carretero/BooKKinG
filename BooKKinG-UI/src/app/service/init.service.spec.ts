import { TestBed, inject } from '@angular/core/testing';

import { InitService } from './init.service';
import { HttpModule } from '@angular/http';

describe('InitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitService],
      imports: [
        HttpModule
      ],
    });
  });

  it('should be created', inject([InitService], (service: InitService) => {
    expect(service).toBeTruthy();
  }));
});
