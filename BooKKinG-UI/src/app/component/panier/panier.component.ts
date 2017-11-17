import { PanierService } from './../../service/panier.service';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { Client } from '../../model/client';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})


export class PanierComponent implements OnInit {

  listeLivre : Livre[] =[];
 // client : Client = {identifiant:'', mdp:''};
  constructor() { }


  ngOnInit() {
   // console.log("panier du client : "+ this.client.identifiant);
    this.listeLivre = this.contenuPanier();
    //this.listeLivre = this.service.liste;
  }

  public contenuPanier(): Livre[] {
    //public contenuPanier(): Observable<Livre[]> { 
     /* return this.http.get(`http://localhost:8080/livres`)
      .map(res => res.json()._embedded.livres); 
      */
      let liste : Livre[];
      liste = [{id:1, titre:'Chien errant', auteur:'Kate Koja', genre:'roman', prix:9},
      {id:1, titre:'CupCake & co', auteur:'Marabout', genre : 'cuisine', prix:11}
      ];
      return liste;
    }


    public payer(){
      let montant = 0;
      for(let livre of this.listeLivre){
        montant = montant + livre.prix;
      }
       console.log("payer contenu du panier : " + montant); 
      return montant;
    }

    public payerAvecAdresse(){
      let montant = this.payer();


    }

    public payerPointCollecte(){
      let montant = this.payer();
      
    }
}
