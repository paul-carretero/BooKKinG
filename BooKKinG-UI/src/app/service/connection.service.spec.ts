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
    service.connection(client).subscribe(c =>{
      expect(this.getConnectionStatus()).toEqual(true);
    });    
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
    service.connection(client).subscribe( c => {
      let clientGetted = service.getCurrentUser();
      expect(clientGetted).toEqual(client);
    });
  }));
    
  it('should be disonnected', inject([ConnectionService], (service : ConnectionService) =>
  {
    const client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    }
    service.connection(client).subscribe(c =>{
      this.deconnexion();
      expect(this.getConnectionStatus()).toEqual(false);
    });
  }));


  it('should modify client', inject([ConnectionService], (service : ConnectionService) =>
  {
    const client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    }
    service.connection(client).subscribe(c =>{
      let clientModify : Client = {
        name : 'testModifyUser',
        address : 'testModifyAddress',
        email: 'testModifyEmailAddress',
        password: 'testModifypassword',
        admin : false
      }
      service.modifierClient(clientModify).subscribe( cm =>{
        expect(service.getCurrentUser()).toEqual(clientModify);

      });
    });

  }));

    
    
  

});
