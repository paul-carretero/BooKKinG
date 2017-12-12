import { PanierService } from './../../service/panier.service';
import { AchatService } from './../../service/achat.service';
import { Component, OnInit } from '@angular/core';
import { PanierComponent } from '../panier/panier.component';
import { ConnectionService } from '../../service/connection.service';

@Component({
  selector: 'app-fin-paiement',
  templateUrl: './fin-paiement.component.html',
  styleUrls: ['./fin-paiement.component.css']
})
/**
 * Composant correspondant à la fin du processus de paiement
 */
export class FinPaiementComponent implements OnInit {

  constructor(private serviceAchat: AchatService, private servicePanier: PanierService, private serviceClient: ConnectionService) { }


  ngOnInit() {
    // on vide le panier
    PanierComponent.contenuPanier = [];
    // A TESTER !!
    this.serviceAchat.enregistrerCommande().subscribe(
      reponse => {
        console.log('enregistrement de la commande ' + JSON.stringify(reponse));
        // on supprime l'enregistrement en base de donnée
        if (reponse.success) {
          this.servicePanier.viderPanier().subscribe(
            reponseVider => {
              console.log('panier vidé en base de donnée : ' + reponseVider.success);
            }
          );
        }
      }
    );

  }

}
