import { PanierService } from './../../service/panier.service';
import { AchatService } from './../../service/achat.service';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { ConnectionService } from '../../service/connection.service';
import { LivraisonComponent } from '../livraison/livraison.component';

@Component({
  selector: 'app-fin-paiement',
  templateUrl: './fin-paiement.component.html',
  styleUrls: ['./fin-paiement.component.css']
})
/**
 * Composant correspondant à la fin du processus de paiement
 */
export class FinPaiementComponent implements OnInit {

  constructor(private serviceAchat: AchatService, private servicePanier: PanierService, private serviceConnect : ConnectionService) { }


  ngOnInit() {
    // on enregistre la commande
    console.log("taille du panier" + this.servicePanier.getContenuPanier().length);
    console.log("connected ?" +this.serviceConnect.getConnectionStatus());
    this.serviceAchat.enregistrerCommande(LivraisonComponent.adresseLivraison).subscribe(
      reponse => {
        console.log('enregistrement de la commande ' + JSON.stringify(reponse));
        console.log("taille du panier" + this.servicePanier.getContenuPanier().length);
        console.log("connected ?" +this.serviceConnect.getConnectionStatus());
        // on supprime l'enregistrement en base de donnée
        if (reponse.success) {
          console.log('enregistrement de la commande réussi');
          this.servicePanier.viderPanier().subscribe(
            reponseVider => {
              console.log('panier vidé en base de donnée : ' + reponseVider.success);
            }
          );
        }
      }
    );
    //Globals.payer=false;
    Globals.setMode('TERMINER');
  }

  public  initHeader():void{
    console.log("aaaaaaaaaaaaaa");
    Globals.setEtat(false);
  }


}
