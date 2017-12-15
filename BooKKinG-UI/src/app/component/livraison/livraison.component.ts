import { ConnectionComponent } from './../../component/connection/connection.component';
import { Router } from '@angular/router';
import { PointLivraison } from './../../model/point-livraison';
import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../service/connection.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})

/**
 * Composant correspondant à la livraison
 */
export class LivraisonComponent implements OnInit {
  static prixLivraison: number;

  listePointLivraison: PointLivraison[];
  adresseClient: string;
  prixAdresseClient = 10;
  prixAdresseSaisie = 20;

  constructor(private router: Router, private connectionService: ConnectionService) { }

  ngOnInit() {
    console.log('dans Livraison');
    this.generatePointLivraison();
    this.adresseClient = this.connectionService.getCurrentUser().address;
  }


  public generatePointLivraison() {
    this.listePointLivraison = [

      { nom: 'Tabac Presse', datesLivraison: 'Livré entre le 26.12 et le 31.12', adresse: '15 rue Pierre Brosselette - 38400 ST MARTIN D HERES', prix: 0 },

      { nom: 'Alessi Cerame', datesLivraison: 'Livré entre le 26.12 et le 31.12', adresse: '11 rue des Glairons - 38400 ST MARTIN D HERES ', prix: 3 }

    ];

  }


  public ChoixPointLivraison(pointLivraison: PointLivraison) {
    console.log('Point de livraison choisi : ' + pointLivraison.nom);
    LivraisonComponent.prixLivraison = pointLivraison.prix;
    this.router.navigate(['payer']);
  }

  public ChoixAdressePersonnelle() {
    console.log('Adresse personnelle choisie : ');
    LivraisonComponent.prixLivraison = this.prixAdresseClient;
    this.router.navigate(['payer']);

  }


  public saisirAdresse(form) {
    console.log('dans saisir une adresse de livraison');
    console.log('contenu du formulaire {' + form.value.numero + ' ' + form.value.rue + ' - ' + form.value.codePostal + ' ' + form.value.ville + '}');
    LivraisonComponent.prixLivraison = this.prixAdresseSaisie;
    this.router.navigate(['payer']);

  }

  public setMode(mode : string):string{
    return Globals.etapePaiment=mode;
  }
}
