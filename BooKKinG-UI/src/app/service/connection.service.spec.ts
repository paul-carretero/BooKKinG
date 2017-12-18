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

  it('should get status', inject([ConnectionService], (service : ConnectionService) =>
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
        expect(service.getConnectionStatus()).toEqual(true);
      }); 
    });
         
  }));
/*
  it('should get client ', inject([ConnectionService], (service : ConnectionService) =>
  {
    let client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    };
    service.creationClient(client).subscribe(c =>{
      service.connection(client).subscribe( co => {        
        expect(service.getCurrentUser()).toEqual(client);
      });
    });
  }));

  it('should be disonnected', inject([ConnectionService], (service : ConnectionService) =>
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
        service.deconnexion();
        expect(service.getConnectionStatus()).toEqual(false);
      });
    });
    
  }));


  it('should modify client', inject([ConnectionService], (service : ConnectionService) =>
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

  it('should save card in account', inject([ConnectionService, PanierService], 
    (serviceConnection : ConnectionService, servicePanier : PanierService) =>
  {
    let livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5,
      type: 'type', stock: 10
    };

    let client : Client = {
      name : 'testUser',
      address : 'testAddress',
      email: 'testEmailAddress',
      password: 'testpassword',
      admin : false
    };
    serviceConnection.creationClient(client).subscribe(c =>{
      serviceConnection.connection(client).subscribe(co =>{
        let quantity = 1;
        servicePanier.ajouterLivrePanier(livre, quantity);
        servicePanier.recupererPanier();
        let contenuPanierBefore = servicePanier.getContenuPanier();
        serviceConnection.panierServiceRegister(servicePanier);
        serviceConnection.deconnexion(); 
        serviceConnection.connection(client).subscribe(co =>{
          let contenuPanierAfter = servicePanier.getContenuPanier();
          expect(contenuPanierAfter).toEqual(contenuPanierBefore);
        });       
      });
     
    });
  }));
    
    */
  

});
