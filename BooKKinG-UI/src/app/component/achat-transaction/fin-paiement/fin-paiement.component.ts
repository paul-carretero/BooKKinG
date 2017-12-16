import { PanierService } from './../../../service/panier.service';
import { AchatService } from './../../../service/achat.service';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { ConnectionService } from '../../../service/connection.service';
import { LivraisonComponent } from '../livraison/livraison.component';
import { NavigationService } from '../../../service/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-paiement',
  templateUrl: './fin-paiement.component.html',
  styleUrls: ['./fin-paiement.component.css']
})
/**
 * Composant correspondant à la fin du processus de paiement
 */
export class FinPaiementComponent implements OnInit {

  constructor(private router: Router, private serviceAchat: AchatService, private serviceConnect: ConnectionService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    // on enregistre la commande
    this.serviceAchat.enregistrerCommande().subscribe(
      reponse => {
        console.log('enregistrement de la commande ' + JSON.stringify(reponse));
        // on supprime l'enregistrement en base de donnée
        if (reponse.success) {
          console.log('enregistrement de la commande réussi');
        } else {
          console.log(reponse.message);
        }
      }
    );
  }

  private setCurrentOther(other: string): void {
    if (Globals.otherNavPage.includes(other)) {
      this.navigationService.setCurrentOther(other);
      this.router.navigate([Globals.getRoute(other)]);
    }
  }
}
