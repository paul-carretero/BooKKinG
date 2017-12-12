import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from '../../service/connection.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  /**
  * Constructeur du composant connection
  * @param routeur permet de gérer le routage
  * @param service permet d'accéder aux services du composant ConnectionService
  */
  constructor(private routeur: Router, private service: ConnectionService, private fb: FormBuilder) {
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

  }

  /**
  * Fonction appelée lors de la demande de connexion par l'utilisateur, par le biai du formulaire de connection
  */
  public connexion() {
    const connClient = new Client();
    connClient.password = this.connexionForm.value.password;
    connClient.email = this.connexionForm.value.email;

    // partie fonctionnelle avec le serveur
    this.service.connection(connClient).subscribe(
      connected => {
        if (connected.success) {
          this.serverResponse = '';
        } else {
          this.serverResponse = connected.message;
        }
      }
    );
  }

  /**
   * Méthode permettant la déconnexion d'un client
   */
  public deconnexion() {
    this.service.deconnexion();
  }
}
