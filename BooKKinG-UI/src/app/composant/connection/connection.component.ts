import { PanierService } from './../../service/panier.service';
import { PanierComponent } from './../../component/panier/panier.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from '../../service/connection.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})


/**
 * Composant correspondant à la page de connection d'un utilisateur (la page contient un formulaire)
 */
export class ConnectionComponent implements OnInit { 
  /**
   * Attribut correspondant au client connecté
   */
  client : Client = new Client();


  static client : Client;


  /**
   * Attribut correspondant au fait que l'utilisateur est connecté
   * A false tant que la connection n'a pas été réalisée.
   */
  static clientConnecte : boolean = false;
  
  /**
   * Attribut correspondant à la validité de l'email renseigné
   * Tant que l'utilisateur ne soumet aucune information, l'email est considéré comme valide
   */
  validEmail : boolean = true;
 
  /**
   * Attribut correspondant à la validité du mot de passe renseigné
   * Tant que l'utilisateur ne soumet aucune information, le mot de passe est considéré comme valide
   */
  validPassword : boolean = true;



  /**
   * Attribut correspondant à l'affichage dynamique de la connection du client
   */
  clientConnecte : boolean = false;

  /**
  * Constructeur du composant connection
  * @param routeur permet de gérer le routage
  * @param service permet d'accéder aux services du composant ConnectionService
  */
  constructor(private routeur : Router, private service : ConnectionService, private servicePanier : PanierService) { }

  /**
  * Méthode appelée lors de l'initialisation de la page html liée au composant
  */
  ngOnInit() {
    console.log("dans connection");
    this.validEmail = true;
    this.validPassword = true;
    this.clientConnecte = ConnectionComponent.clientConnecte;
    if(ConnectionComponent.client) this.client = ConnectionComponent.client;
    
  }

  /**
  * Fonction appelée lors de la demande de connection par l'utilisateur, par le biai du formulaire de connection
  * @param form le formulaire contenant les données saisies pour la connection
  */
  public connection(form: NgForm){
    console.log("dans envoi connection");   

    console.log("contenu du formulaire {" + form.value.email + "," + form.value.password + "}");
    
    // l'utilisateur n'est pas encore connecté
    ConnectionComponent.clientConnecte = false;

    // vérification de l'email renseigné par l'utilisateur, si il est valide alors validEmail est mis à true
    if(form.value.email == '') this.validEmail = false;
    else this.validEmail = true;
    

    // vérification du passeword renseigné par l'utilisateur, si il est valide alors validPassword est mis à true
    if(form.value.password == '') this.validPassword = false;
    else this.validPassword = true;
   
    // si l'email et le password sont valid, alors on peut procéder à la demande de connections
    if(this.validEmail && this.validPassword){
      // récupération du contenu du formulaire
      this.client.email = form.value.email;
      this.client.password = form.value.password;   

/*
      // code en dur pour des tests sans serveur
      console.log("test en dur");
      this.client.name = "myriamProjet";
      this.client.address = "12 allée des cerisiers";
      ConnectionComponent.client = this.client;
      console.log("utilisateur : " + this.client.email + " connecté");
      // l'utilisateur est maintenant connecté
      ConnectionComponent.clientConnecte = true;
       this.clientConnecte = ConnectionComponent.clientConnecte;
      
*/
      
      // partie fonctionnelle avec le serveur
      this.service.connection(this.client).subscribe(
        connected => {
          console.log('connection result ' + JSON.stringify(connected));
          // si la connection a réussie
          if(connected.success){
            // on récupère les données liées au compte client
            this.service.recuperationInformationsClient().subscribe(
              client => {
                console.log('loading result ' + JSON.stringify(client));
                // on met à jour les informations du client 
                this.client.name = client.name;
                this.client.email = client.email; 
                this.client.address = client.address;
                this.client.password = client.password;
                ConnectionComponent.client = this.client;
                console.log("utilisateur : " + this.client.email + " connecté");
                // l'utilisateur est maintenant connecté
                ConnectionComponent.clientConnecte = true;
                this.clientConnecte = ConnectionComponent.clientConnecte;
                /*if(PanierComponent.tabLivre.length == 0){
                  this.servicePanier.recupererPanier().subscribe(
                    panier =>{
                      
                    }
                  );
                }
                */
                
              }
            );
          }else{
            alert(connected.message);
          }
        }
      );
      // fin partie fonctionnelle avec le serveur
    }    
  }

  /**
   * Méthode permettant la déconnexion d'un client
   */
  public deconnexion(){    


    // partie fonctionnant avec le serveur
    this.service.deconnexion().subscribe(
      deconnected => {
        if(deconnected.success){
          console.log("déconnexion du client");
          this.client = ConnectionComponent.client = new Client();
          this.clientConnecte = ConnectionComponent.clientConnecte = false;
        }
      }
    );

  }
}
