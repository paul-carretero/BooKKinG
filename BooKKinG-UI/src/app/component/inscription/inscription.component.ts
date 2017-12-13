import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from '../../service/connection.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  /**
   * Attribut correspondant au client connecté
   */
  client: Client = { name: '', address: '', email: '', password: '' };

  constructor(private service: ConnectionService) { }

  ngOnInit() {
  }

  public inscription(form: NgForm) {
    if (form.value.password === form.value.passwordbis) {
      this.client.name = form.value.name;
      this.client.email = form.value.email;
      this.client.address = form.value.address;
      this.client.password = form.value.password;
      this.service.creationClient(this.client).subscribe(
        connected => {
          if (connected.success) {
            alert('Votre inscription a bien été validée !');
          } else {
            alert(connected.message);
          }
        }
      );
    } else {
      alert('Le mot de passe ne correspond pas !');
    }
  }


}
