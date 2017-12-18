import { Article } from './../model/article';
import { Livre } from './../model/livre';
import { AchatService } from './achat.service';
import { ConnectionService } from './connection.service';
import { TestBed, inject } from '@angular/core/testing';

import { PanierService } from './panier.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { NotifService } from './notif.service';
import { ExceptionInfo } from '_debugger';
import { Client } from '../model/client';

describe('PanierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PanierService,
        ConnectionService,
        AchatService,
        NotifService
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

  it('ajouter un livre dans le panier', inject([PanierService, ConnectionService], (service: PanierService, serviceConnect : ConnectionService) => {
    const livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5.6,
      type: 'type', stock: 10
    };
    const quantity = 1;
    let client : Client = {
      name:"", email:"toto1@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
    service.ajouterLivrePanier(livre, quantity);
    const contenuPanier: Article[] = service.getContenuPanier();
    const contenuAttendu: Article[] = [
      { book: livre, quantity: quantity, idBook: livre.idBook }];
    expect(contenuPanier).toEqual(contenuAttendu);
      });
    });
  }));


  it('erreur ajouter un livre dans le panier', inject([PanierService, ConnectionService], (service: PanierService, serviceConnect : ConnectionService) => {
    const livre: Livre = {
      title: "titre", author: "auteur",
      genre: "genre", summary: "résumé",
      idBook: 1, price: 5.6,
      type: "type", stock: 10
    }
    const quantity = 1;
    let client : Client = {
      name:"", email:"toto2@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
    service.ajouterLivrePanier(livre, quantity);
    const contenuPanier: Article[] = service.getContenuPanier();
    const contenuPasAttendu: Article[] = [{ book: livre, quantity: quantity + 2, idBook: livre.idBook }]
    expect(contenuPanier).not.toEqual(contenuPasAttendu);
      });
    });
  }));

  it('calcul du prix total dans le panier', inject([PanierService, ConnectionService], (service: PanierService, serviceConnect : ConnectionService) => {
    let livre: Livre = {
      title: "titre", author: "auteur",
      genre: "genre", summary: "résumé",
      idBook: 1, price: 5,
      type: 'type', stock: 10
    }
    let quantity = 2;
    service.ajouterLivrePanier(livre, quantity);
    livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 2, price: 3,
      type: 'type', stock: 10
    }
    quantity = 1;
    let client : Client = {
      name:"", email:"toto3@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
    service.ajouterLivrePanier(livre, quantity);
    const prixTotal = service.getTotalPrice();
    const prixAttendu = 13;
    expect(prixTotal).toEqual(prixAttendu);
      });
    });
  }));

  it('erreur calcul du prix total dans le panier', inject([PanierService, ConnectionService], (service: PanierService, serviceConnect: ConnectionService) => {
    let livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5,
      type: 'type', stock: 10
    }
    let quantity = 2;
    service.ajouterLivrePanier(livre, quantity);
    livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 2, price: 3,
      type: 'type', stock: 10
    }
    quantity = 1;
    let client : Client = {
      name:"", email:"toto4@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
    service.ajouterLivrePanier(livre, quantity);
    const prixTotal = service.getTotalPrice();
    const prixPasAttendu = 20;
    expect(prixTotal).not.toEqual(prixPasAttendu);
      });
    });
  }));

  it('nombre de livre dans le panier', inject([PanierService, ConnectionService], (service: PanierService, serviceConnect : ConnectionService) => {
    let livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5,
      type: 'type', stock: 10
    }
    let quantity = 2;
    service.ajouterLivrePanier(livre, quantity);
    livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 2, price: 3,
      type: 'type', stock: 10
    }
    quantity = 1;
    let client : Client = {
      name:"", email:"toto5@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
    service.ajouterLivrePanier(livre, quantity);
    let nbLivre= service.getNumberOfItems();
    const nbLivreAttendu = 3;
    expect(nbLivre).toEqual(nbLivreAttendu);
      });
    });
  }));



  it('mise a jour quantite livre dans panier', inject([PanierService, ConnectionService], (service: PanierService, serviceConnect : ConnectionService) => {
    const livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5,
      type: 'type', stock: 10
    }
    let quantity = 2;
    let client : Client = {
      name:"", email:"toto6@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
    service.ajouterLivrePanier(livre, quantity);
    quantity = 5;
    service.setQuantity(livre.idBook, quantity);
    const quantityLivre = service.getContenuPanier()[0].quantity;
    const quantityAttendue = 5;
    expect(quantityLivre).toEqual(quantityAttendue);
      });
    });

  }));



  it('vider panier', inject([PanierService, ConnectionService], (service: PanierService, serviceConnect : ConnectionService) => {
    const livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5.6,
      type: 'type', stock: 10
    };
    const quantity = 1;
    let client : Client = {
      name:"", email:"toto7@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
    service.ajouterLivrePanier(livre, quantity);
    service.viderPanier();
    const contenuPanier: Article[] = service.getContenuPanier();
    const contenuAttendu: Article[] = [];
    expect(contenuPanier).toEqual(contenuAttendu);
      });
    });
  }));


  it('recuperer panier', inject([PanierService, ConnectionService], (service: PanierService, serviceConnect : ConnectionService) => {
    let livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5,
      type: 'type', stock: 10
    }
    let quantity = 2;
    service.ajouterLivrePanier(livre, quantity);
    let livre2 = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 2, price: 3,
      type: 'type', stock: 10
    }
    let quantity2 = 1;
    service.ajouterLivrePanier(livre2, quantity2);
    let client : Client = {
      name:"", email:"toto8@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
        serviceConnect.deconnexion();
        service.viderPanier();
        serviceConnect.connection(client).subscribe(conn =>{
          service.recupererPanier();
          let contenuRecup = service.getContenuPanier();
          const contenuAttendu : Article[] = [{ book: livre, quantity: quantity, idBook: livre.idBook }, { book: livre2, quantity: quantity2, idBook: livre2.idBook } ]
          expect(contenuRecup).toEqual(contenuAttendu);
        });  
      });
    });
  }));



  it('modifier quantité livre dans le panier enregistré', inject([PanierService, ConnectionService], 
    (service: PanierService, serviceConnect: ConnectionService) => {
    const livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5,
      type: 'type', stock: 10
    }
    let quantity = 2;
    
    let client : Client = {
      name:"", email:"toto9@toto.com", admin:false,
      address:"", password:"123" 
    };
    serviceConnect.creationClient(client).subscribe(c =>{
      serviceConnect.connection(client).subscribe(co=>{
        service.ajouterLivrePanier(livre, quantity);
        let quantity2 = 5;
        service.setQuantity(livre.idBook, quantity2);
         service.recupererPanier();
        let contenuRecup = service.getContenuPanier();
        const contenuAttendu : Article[] = [{ book: livre, quantity: quantity2, idBook: livre.idBook }];
        expect(contenuRecup).toEqual(contenuAttendu);
      });
    });
    
  }));


});
