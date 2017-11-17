import { PanierComponent } from './../../component/panier/panier.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'



@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  client : Client = {name:'', address:'', email : '', password:''};

  constructor(private http : Http, private routeur : Router) { }

  ngOnInit() {
    console.log("dans connection");
    
  }


  public connection(){
    console.log("dans envoi connection");    
    this.client = {name:'', address:'', email : 'paul@carretero.ovh', password:'123456'};
    
    //public connection(){
    //let connect = this.http.get(`http://Server-web/Login`);
    let connect = this.http.get(`http://192.168.43.58:8080/BooKKinG-Server-web/Login`);
    
    //let connect = this.http.post(`http://192.168.43.58:8080/BooKKinG-Server-web/Login`, this.client);
    
    //.map(res => res.json()._embedded);
    if (connect) console.log("connecté" + connect);
    else console.log("pas connecté");
    
/*
    this.client.id=1;
    console.log("utilisateur : " + this.client.identifiant + " connecté");
    //this.routeur.navigate(['/panier']);
    */
  }

}
