import { ConnectionService } from './../../../service/connection.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { AchatService } from '../../../service/achat.service';
import { NavigationService } from '../../../service/navigation.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})

/**
 * Composant correspondant à la livraison
 */
export class LivraisonComponent implements OnInit {

  constructor(private router: Router, private connectionService: ConnectionService, private achatService: AchatService, private navigationService: NavigationService) { }

  ngOnInit() { }

  get LivraisonStandard(): number {
    return Globals.prixLivraison;
  }

  get addressClient(): string {
    return this.connectionService.getCurrentUser().address;
  }

  get listePointLivraison(): string[] {
    return Globals.pointLivraison;
  }

  public ChoixPointLivraison(pointLivraison: string) {
    this.achatService.setAddress(pointLivraison);
    //this.router.navigate(['payer']);
    this.navigationService.setCurrentOther(Globals.PAYER);
    this.router.navigate([Globals.getRoute(Globals.PAYER)]);
  }

  public ChoixAdressePersonnelle() {
    this.achatService.setAddress(this.addressClient);
    //this.router.navigate(['payer']);
    this.navigationService.setCurrentOther(Globals.PAYER);
    this.router.navigate([Globals.getRoute(Globals.PAYER)]);

  }

  public saisirAdresse(form) {
    const addresse = form.value.numero + ' ' + form.value.rue + ' - ' + form.value.codePostal + ' ' + form.value.ville;
    this.achatService.setAddress(addresse);
    //this.router.navigate(['payer']);
    this.navigationService.setCurrentOther(Globals.PAYER);
    this.router.navigate([Globals.getRoute(Globals.PAYER)]);

  }
}
