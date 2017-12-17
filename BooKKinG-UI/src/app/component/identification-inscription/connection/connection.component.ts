import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from '../../../service/connection.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Globals } from '../../../globals';
import { AchatService } from '../../../service/achat.service';
import { NotifService } from '../../../service/notif.service';
import { NavigationService } from '../../../service/navigation.service';
import { HistoriquePagesService } from '../../../service/historique-pages.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

/**
 * Composant correspondant à la page de connection d'un utilisateur (la page contient un formulaire)
 */
export class ConnectionComponent implements OnInit {

  private serverResponse: string;

  private connexionForm: FormGroup;

  private resetPassword: boolean;

  private resetPwdForm: FormGroup;

  private serverResponseClass = 'bg-danger';

  /**
  * Constructeur du composant connection
  * @param routeur permet de gérer le routage
  * @param service permet d'accéder aux services du composant ConnectionService
  */
  constructor(private routeur: Router, private service: ConnectionService, private fb: FormBuilder,
    private achatService: AchatService, private notifService: NotifService, private navService: NavigationService,
    private histoNav: HistoriquePagesService) {
    this.connexionForm = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
    this.resetPwdForm = fb.group({
      resemail: ['', Validators.email],
    });
    this.serverResponse = '';
  }

  /**
  * Méthode appelée lors de l'initialisation de la page html liée au composant
  */
  ngOnInit() {
    this.resetPassword = false;
    this.serverResponseClass = 'bg-danger';
  }

  private returnPrevPage(): void {
    if (this.histoNav.canGoBack()) {
      const navPage = this.histoNav.navPagePrecedente();
      if (navPage) {
        if (navPage.livre) {
          this.routeur.navigate([Globals.getRoute(Globals.LIVRE), navPage.livre.idBook]);
        } else {
          console.log(JSON.stringify(navPage));
          this.routeur.navigate([Globals.getRoute(navPage.other)]);
        }
      }
    }
  }

  /**
  * Fonction appelée lors de la demande de connexion par l'utilisateur, par le biai du formulaire de connection
  */
  private connexion(): void {
    const connClient = new Client();
    connClient.password = this.connexionForm.value.password;
    connClient.email = this.connexionForm.value.email;

    // partie fonctionnelle avec le serveur
    this.service.connection(connClient).subscribe(
      connected => {
        if (connected.success) {
          this.notifService.getSubject().next('vous vous êtes connecté avec succès!');
          this.serverResponse = '';

          if (this.achatService.getTransactionState()) {
            this.navService.setCurrentOther(Globals.LIVRAISON);
            this.routeur.navigate([Globals.getRoute(Globals.LIVRAISON)]);
          } else {
            this.returnPrevPage();
          }
        } else {
          this.serverResponseClass = 'bg-danger';
          this.serverResponse = connected.message;
        }
      }
    );
  }

  private initResetPassword(): void {
    this.resetPassword = true;
    this.serverResponse = '';
  }

  private initDefaultConnection(): void {
    this.resetPassword = false;
  }

  private resetPwd(): void {
    const email: string = this.resetPwdForm.value.resemail;
    this.service.reinitialiserMotDePasse(email).subscribe(
      res => {
        if (res.success) {
          this.serverResponse = 'Votre nouveau mot de passe vous a été envoyer par mail';
          this.serverResponseClass = 'bg-success';
          this.initDefaultConnection();
        } else {
          this.serverResponse = res.message;
        }
      }
    );
  }

}
