import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../../../service/connection.service';
import { NotifService } from '../../../service/notif.service';
import { NavigationService } from '../../../service/navigation.service';
import { Client } from '../../../model/client';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-connexion-admin',
  templateUrl: './connexion-admin.component.html',
  styleUrls: ['./connexion-admin.component.css']
})
export class ConnexionAdminComponent implements OnInit {
  private serverResponse: string;

  private connexionForm: FormGroup;

  private serverResponseClass = 'bg-danger';

  private connected : boolean;

  /**
  * Constructeur du composant connection
  * @param routeur permet de gérer le routage
  * @param service permet d'accéder aux services du composant ConnectionService
  */
  constructor(private routeur: Router, private service: ConnectionService, private fb: FormBuilder,
    //private achatService: AchatService, 
    private notifService: NotifService, private navService: NavigationService) {
    this.connexionForm = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
    this.serverResponse = '';
  }

  /**
  * Méthode appelée lors de l'initialisation de la page html liée au composant
  */
  ngOnInit() {
    this.serverResponseClass = 'bg-danger';
    this.connected = false;
  }

  /**
  * Fonction appelée lors de la demande de connexion par l'utilisateur, par le biai du formulaire de connection
  */
  private connexion(): void {
    const connAdmin = new Client();
    connAdmin.password = this.connexionForm.value.password;
    connAdmin.email = this.connexionForm.value.email;

    // partie fonctionnelle avec le serveur
    this.service.connection(connAdmin).subscribe(
      connected => {
        if (connected.success) {
          //if(connected.admin){
            this.connectionAdminReussie();
         // }
         // else{
         //   this.echecConnectionAdmin();
         // }
        } else {
          this.echecConnection(connected.message); 
        }
      }
    );
  }

  private connectionAdminReussie():void{
    console.log("connexion admin réussie");
    this.notifService.getSubject().next('vous vous êtes connecté avec succès!');
    this.serverResponse = '';
  }

  private echecConnectionAdmin():void{
    console.log("connexion admin echouée");
    this.service.deconnexion();
    this.serverResponseClass = 'bg-danger';
    this.serverResponse = "Vous devez vous connectez avec un compte administrateur !";
  }

  private echecConnection(message) :void{
    console.log("connexion echouée");
    this.serverResponseClass = 'bg-danger';
    this.serverResponse = message;
  }


}
