import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/client';
import { ConnectionService } from '../../../service/connection.service';
import { Console } from '@angular/core/src/console';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-informations-client',
  templateUrl: './informations-client.component.html',
  styleUrls: ['./informations-client.component.css']
})
export class InformationsClientComponent implements OnInit {

  public serverResponseModifier: string;

  public serverResponsePassword: string;

  public serverResponseModifierSuccess: string;

  public serverResponsePasswordSuccess: string;

  public modifierForm: FormGroup;

  public passwordForm: FormGroup;

  public clientModifie: Client;

  constructor(private serviceConnection: ConnectionService, private fb: FormBuilder) {
    this.clientModifie = new Client();
    this.serverResponseModifier = '';
    this.serverResponsePassword = '';
    this.serverResponseModifierSuccess = '';
    this.serverResponsePasswordSuccess = '';

    this.modifierForm = fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.passwordForm = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.serviceConnection.getCurrentUser().email != null) {
      this.clientModifie = Client.clone(this.serviceConnection.getCurrentUser());
    } else {
      const conn = this.serviceConnection.getCurrentUserSub().asObservable();
      conn.subscribe(
        client => {
          if (client.email != null) {
            this.clientModifie = Client.clone(client);
          }
        }
      );
    }
  }

  public modifier() {
    const conn = this.serviceConnection.modifierClient(this.clientModifie).subscribe(
      reponse => {
        if (reponse.success) {
          this.serverResponseModifierSuccess = 'Informations mises à jour';
          this.serverResponseModifier = '';
        } else {
          this.serverResponseModifierSuccess = '';
          this.serverResponseModifier = reponse.message;
        }
        conn.unsubscribe();
      }
    );
  }

  public modifierPassword() {
    const c = new Client();
    c.password = this.passwordForm.value.password;
    const conn = this.serviceConnection.modifierClient(c).subscribe(
      reponse => {
        if (reponse.success) {
          this.serverResponsePasswordSuccess = 'Mot de passe mis à jour';
          this.serverResponsePassword = '';
        } else {
          this.serverResponsePasswordSuccess = '';
          this.serverResponsePassword = reponse.message;
        }
        conn.unsubscribe();
      }
    );
  }

}
