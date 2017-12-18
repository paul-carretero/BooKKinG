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
/*
  it('should get status', inject([ConnectionService, PanierService], 
    (serviceConnection : ConnectionService, servicePanier : PanierService) =>
  {
    let client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    };
    serviceConnection.setPanierService(servicePanier);
    serviceConnection.creationClient(client).subscribe(c =>{      
      serviceConnection.connection(client).subscribe(co =>{        
        expect(serviceConnection.getConnectionStatus()).toEqual(true);
      }); 
    });
         
  }));

  it('should get client ', inject([ConnectionService, PanierService, NotifService], 
    (serviceConnection : ConnectionService, servicePanier : PanierService, serviceNotification : NotifService) =>
  {
    let client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    };
    serviceConnection.creationClient(client).subscribe(c =>{
      serviceConnection.connection(client).subscribe( co => {        
        expect(serviceConnection.getCurrentUser()).toEqual(client);
      });
    });
  }));

  it('should be disonnected',inject([ConnectionService, PanierService, NotifService], 
    (serviceConnection : ConnectionService, servicePanier : PanierService, serviceNotif : NotifService) =>
  {
    let client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    };
    serviceConnection.creationClient(client).subscribe(c =>{
      serviceConnection.connection(client).subscribe(co =>{
        serviceConnection.deconnexion();
        expect(serviceConnection.getConnectionStatus()).toEqual(false);
      });
    });
    
  }));

  it('should modify client', inject([ConnectionService, PanierService, NotifService],
     (service : ConnectionService, servicePanier : PanierService, notifService : NotifService) =>
  {
    let client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    };
    service.creationClient(client).subscribe(c =>{
      service.connection(client).subscribe(co =>{
        let clientModify : Client = {
          name : 'testModifyUser',
          address : 'testModifyAddress',
          email: 'testModifyEmailAddress',
          password: 'testModifypassword',
          admin : false
        };
        service.modifierClient(clientModify).subscribe( cm =>{             
          expect(service.getCurrentUser()).toEqual(clientModify);                      
        });
      }); 
    });    
  }));
  
*/
});
