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

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  private serverResponse: string;

  private inscriptionForm: FormGroup;

  constructor(private routeur: Router, private service: ConnectionService, private fb: FormBuilder,
    private achatService: AchatService, private notifService: NotifService, private navService: NavigationService) {
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
    this.service.creationClient(connClient).subscribe(
      response => {
        if (response.success) {
          this.notifService.getSubject().next('vous vous êtes enregistré avec succès!');
          if (this.achatService.getTransactionState()) {
            this.navService.setCurrentOther(Globals.LIVRAISON);
            this.routeur.navigate([Globals.getRoute(Globals.LIVRAISON)]);
          } else {
            this.navService.setCurrentOther(Globals.COMPTE);
            this.routeur.navigate([Globals.getRoute(Globals.COMPTE)]);
          }
        } else {
          this.serverResponse = response.message;
        }
      }
    );
  }


}
