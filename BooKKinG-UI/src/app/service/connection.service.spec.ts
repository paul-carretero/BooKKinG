import { TestBed, inject } from '@angular/core/testing';

import { ConnectionService } from './connection.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { NotifService } from './notif.service';
import { Client } from './../model/client';

describe('ConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConnectionService,
        NotifService
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

  it('should get status', inject([ConnectionService], (service : ConnectionService) =>
  {
    const client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    }
    service.connection(client);
    expect(service.getConnectionStatus());
  }));

  it('should get client ', inject([ConnectionService], (service : ConnectionService) =>
  {
    const client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    }
    service.connection(client);
    let clientGetted = service.getCurrentUser();
    expect(clientGetted).toEqual(client);
  }));

});
