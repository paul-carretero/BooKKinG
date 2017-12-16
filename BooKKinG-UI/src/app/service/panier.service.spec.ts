import { Article } from './../model/article';
import { Livre } from './../model/livre';
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

  it('ajouter un livre dans le panier', inject([PanierService], (service: PanierService) => {
    const livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5.6,
      type: 'type', stock: 10
    };
    const quantity = 1;
    service.ajouterLivrePanier(livre, quantity);
    const contenuPanier: Article[] = service.getContenuPanier();
    const contenuAttendu: Article[] = [{ book: livre, quantity: quantity, idBook: livre.idBook }]
    expect(contenuPanier).toEqual(contenuAttendu);
  }));


  it('erreur ajouter un livre dans le panier', inject([PanierService], (service: PanierService) => {
    const livre: Livre = {
      title: "titre", author: "auteur",
      genre: "genre", summary: "résumé",
      idBook: 1, price: 5.6,
      type: "type", stock: 10
    }
    const quantity = 1;
    service.ajouterLivrePanier(livre, quantity);
    const contenuPanier: Article[] = service.getContenuPanier();
    const contenuPasAttendu: Article[] = [{ book: livre, quantity: quantity + 2, idBook: livre.idBook }]
    expect(contenuPanier).not.toEqual(contenuPasAttendu);
  }));

  it('calcul du prix total dans le panier', inject([PanierService], (service: PanierService) => {
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
    service.ajouterLivrePanier(livre, quantity);
    const prixTotal = service.getTotalPrice();
    const prixAttendu = 13;
    expect(prixTotal).toEqual(prixAttendu);
  }));

  it('erreur calcul du prix total dans le panier', inject([PanierService], (service: PanierService) => {
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
    service.ajouterLivrePanier(livre, quantity);
    const prixTotal = service.getTotalPrice();
    const prixPasAttendu = 20;
    expect(prixTotal).not.toEqual(prixPasAttendu);
  }));

  it('nombre de livre dans le panier', inject([PanierService], (service: PanierService) => {
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
    service.ajouterLivrePanier(livre, quantity);
    const nbLivre = service.getNumberOfItems();
    const nbLivreAttendu = 3;
    expect(nbLivre).toEqual(nbLivreAttendu);
  }));



  it('mise a jour quantite livre dans panier', inject([PanierService], (service: PanierService) => {
    const livre: Livre = {
      title: 'titre', author: 'auteur',
      genre: 'genre', summary: 'résumé',
      idBook: 1, price: 5,
      type: 'type', stock: 10
    }
    let quantity = 2;
    service.ajouterLivrePanier(livre, quantity);
    quantity = 5;
    service.setQuantity(livre.idBook, quantity);
    const quantityLivre = service.getContenuPanier()[0].quantity;
    const quantityAttendue = 5;
    expect(quantityLivre).toEqual(quantityAttendue);
  }));

});
