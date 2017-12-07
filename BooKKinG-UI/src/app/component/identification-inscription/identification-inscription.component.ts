import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from '../../service/connection.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-identification-inscription',
  templateUrl: './identification-inscription.component.html',
  styleUrls: ['./identification-inscription.component.css']
})
export class IdentificationInscriptionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
