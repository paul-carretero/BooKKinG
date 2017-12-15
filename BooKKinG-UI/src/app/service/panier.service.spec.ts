import { AchatService } from './achat.service';
import { ConnectionService } from './connection.service';
import { TestBed, inject } from '@angular/core/testing';

import { PanierService } from './panier.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('PanierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PanierService,
        ConnectionService,
        AchatService
      ],
      imports: [ 
        RouterTestingModule,
        HttpModule
      ]
    });
  });

  it('should be created', inject([PanierService], (service: PanierService) => {
    expect(service).toBeTruthy();
  }));
});
