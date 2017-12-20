import { TestBed, inject } from '@angular/core/testing';

import { ConnectionService } from './connection.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { NotifService } from './notif.service';
import { Client } from './../model/client';
import { PanierService } from './panier.service';
import { Livre } from '../model/livre';

describe('ConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConnectionService,
        NotifService,
        PanierService
      ],
      imports: [
        RouterTestingModule,
        HttpModule
      ]
    });
  });

  it('should be created', inject([ConnectionService], (service: ConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
