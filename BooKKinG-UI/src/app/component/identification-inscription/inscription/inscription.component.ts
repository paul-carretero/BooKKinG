import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from '../../../service/connection.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotifService } from '../../../service/notif.service';
import { AchatService } from '../../../service/achat.service';
import { NavigationService } from '../../../service/navigation.service';
import { Globals } from '../../../globals';
import { AbstractComponent } from '../../abstract-component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent extends AbstractComponent implements OnInit {

  private serverResponse: string;

  private inscriptionForm: FormGroup;

  constructor(public router: Router, private service: ConnectionService, private fb: FormBuilder,
    private achatService: AchatService, private notifService: NotifService, public navigationService: NavigationService) {
    super(router, navigationService);
    this.inscriptionForm = fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.serverResponse = '';
  }

  ngOnInit() { }

  public inscription() {
    const connClient = new Client();
    connClient.name = this.inscriptionForm.value.name;
    connClient.email = this.inscriptionForm.value.email;
    connClient.address = this.inscriptionForm.value.address;
    connClient.password = this.inscriptionForm.value.password;

    const conn = this.service.creationClient(connClient).subscribe(
      response => {
        if (response.success) {
          this.notifService.publish('vous vous êtes enregistré avec succès!');
          this.service.recuperationInformationsClient();
          if (this.achatService.getTransactionState()) {
            this.navigate(Globals.LIVRAISON);
          } else {
            this.navigate(Globals.COMPTE);
          }
        } else {
          this.serverResponse = response.message;
        }
        conn.unsubscribe();
      }
    );
  }


}
