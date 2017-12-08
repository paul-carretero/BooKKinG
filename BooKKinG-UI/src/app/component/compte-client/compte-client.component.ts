import { ConnectionService } from './../../service/connection.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { ConnectionComponent } from '../../composant/connection/connection.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.css']
})
export class CompteClientComponent implements OnInit {
  client: Client = new Client();
  clientModifie: Client = new Client();
  newPassword: string;

  modifiaction : boolean = false;

  validName : boolean = true;  
  validAddress : boolean = true;  
  validPassword : boolean = true;
  validPasswordConfirm : boolean = true;
  


  constructor(private serviceConnection : ConnectionService ) { }

  ngOnInit() {   
    console.log("dans compte client");
    this.client = ConnectionComponent.client;
    this.validName = true;
    this.validAddress = true;
    this.validPassword = true;
  }


  public modifierInformations(){
    this.modifiaction= true;
    this.clientModifie.name = ConnectionComponent.client.name;
    this.clientModifie.address = ConnectionComponent.client.address;
    this.clientModifie.name = ConnectionComponent.client.name;
  }



  public modifier(){
    console.log("dans modifier informations");
    
    if(this.clientModifie.name == '') this.validName = false;
    else this.validName = true;
    

    if(this.clientModifie.address == '') this.validAddress = false;
    else this.validAddress = true;
    
    if(this.clientModifie.password == '') this.validPassword = false;
    else this.validPassword = true;
   

    if(this.newPassword == '') this.validPasswordConfirm = false;
    else this.validPasswordConfirm = true;

    // si l'email et le password sont valid, alors on peut procéder à la demande de connections
    if(this.validName && this.validAddress && this.validPassword && this.validPasswordConfirm){
      if(this.clientModifie.password != this.newPassword){
        alert("Les mots de passe sont différents !!");
      }
      else{
        // récupération du contenu du formulaire
        this.client.name = this.clientModifie.name;
        this.client.address = this.clientModifie.address;
        this.client.password = this.clientModifie.password; 

        
        // mise à jour du client dans la base de donnée
        this.serviceConnection.modifierClient(this.client).subscribe(
          reponse =>{
            console.log("modification des données du client : " + reponse.success);
            if(reponse.success){
              ConnectionComponent.client = this.client;
            }
            else{
              console.log(reponse.message);
            }
          }
        );




        this.modifiaction = false;  

      }
      
    }




    
  }
}
