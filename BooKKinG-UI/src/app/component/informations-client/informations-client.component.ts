import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { ConnectionService } from '../../service/connection.service';

@Component({
  selector: 'app-informations-client',
  templateUrl: './informations-client.component.html',
  styleUrls: ['./informations-client.component.css']
})
export class InformationsClientComponent implements OnInit {

  private client: Client;
  private clientModifie: Client;
  private newPassword: string;
  private modifiaction = false;
  private validName = true;
  private validAddress = true;
  private validPassword = true;
  private validPasswordConfirm = true;

  constructor(private serviceConnection: ConnectionService) {
    this.client = new Client();
    this.clientModifie = new Client();
  }

  ngOnInit() {
    console.log('dans compte client');
    this.client = this.serviceConnection.getCurrentUser();
    this.validName = true;
    this.validAddress = true;
    this.validPassword = true;
  }

  public modifierInformations() {
    this.modifiaction = true;
    this.clientModifie.name = this.serviceConnection.getCurrentUser().name;
    this.clientModifie.address = this.serviceConnection.getCurrentUser().address;
  }

  public modifier() {
    console.log('dans modifier informations');

    if (this.clientModifie.name === '') {
      this.validName = false;
    } else {
      this.validName = true;
    }

    if (this.clientModifie.address === '') {
      this.validAddress = false;
    } else {
      this.validAddress = true;
    }

    if (this.clientModifie.password === '') {
      this.validPassword = false;
    } else {
      this.validPassword = true;
    }


    if (this.newPassword === '') {
      this.validPasswordConfirm = false;
    } else {
      this.validPasswordConfirm = true;
    }

    // si l'email et le password sont valid, alors on peut procéder à la demande de connections
    if (this.validName && this.validAddress && this.validPassword && this.validPasswordConfirm) {
      if (this.clientModifie.password !== this.newPassword) {
        alert('Les mots de passe sont différents !!');
      } else {

        // récupération du contenu du formulaire
        this.client.name = this.clientModifie.name;
        this.client.address = this.clientModifie.address;
        this.client.password = this.clientModifie.password;

        // mise à jour du client dans la base de donnée
        const conn = this.serviceConnection.modifierClient(this.client).subscribe(
          reponse => {
            console.log('modification des données du client : ' + reponse.success);
            if (!reponse.success) {
              // TODO retour visuel
            }
            conn.unsubscribe();
          }
        );
        this.modifiaction = false;
      }
    }
  }

}
