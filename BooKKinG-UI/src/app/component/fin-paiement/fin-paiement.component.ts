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

  constructor(private serviceAchat: AchatService, private serviceConnect: ConnectionService) { }

  ngOnInit() {
    // on enregistre la commande
    this.serviceAchat.enregistrerCommande().subscribe(
      reponse => {
        console.log('enregistrement de la commande ' + JSON.stringify(reponse));
        // on supprime l'enregistrement en base de donnée
        if (reponse.success) {
          console.log('enregistrement de la commande réussi');
        }
      }
    );
  }
}
