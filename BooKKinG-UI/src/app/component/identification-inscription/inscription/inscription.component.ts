import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from '../../../service/connection.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  private serverResponse: string;

  private inscriptionForm: FormGroup;

  constructor(private routeur: Router, private service: ConnectionService, private fb: FormBuilder) {
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
          // redirect
        } else {
          this.serverResponse = response.message;
        }
      }
    );
  }


}
