import { TestBed, inject } from '@angular/core/testing';

import { InitService } from './init.service';
import { HttpModule } from '@angular/http';
import { Livre } from '../model/livre';

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

  it('max price', inject([InitService], (service: InitService) => {
    const max_price = service.getMaxPrice();
    const max_price_test = 100;
    expect(max_price).toEqual(max_price_test);
  }));

  it('min price', inject([InitService], (service: InitService) => {
    const min_price = service.getMinPrice();
    const min_price_test = 0;
    expect(min_price).toEqual(min_price_test);
  }));

});
