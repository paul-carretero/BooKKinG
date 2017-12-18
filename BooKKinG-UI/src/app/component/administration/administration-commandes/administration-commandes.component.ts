import { AchatService } from './../../../service/achat.service';
import { Component, OnInit } from '@angular/core';
import { Commande } from '../../../model/commande';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-administration-commandes',
  templateUrl: './administration-commandes.component.html',
  styleUrls: ['./administration-commandes.component.css']
})
export class AdministrationCommandesComponent implements OnInit {

  private datesForm : FormGroup;

  constructor(private serviceAchat : AchatService, private fb: FormBuilder) { 
    this.datesForm = fb.group({
      dStart: [''],dEnd:['']
    });


  }

  ngOnInit() {
    this.serviceAchat.récupérerAllCommandes("", "");
  }


  get allCommandes() : Commande[]{
    return this.serviceAchat.getAllCommandes();
  }

  private nombreLivre(commande : Commande) : number{
    return commande.books.length;
  }

  private montantTotal(commande):number{
    return this.serviceAchat.getMontantTotalCommande(commande);
  }

  private rechercherCommandes(){
    let dStart = this.datesForm.value.dStart;
    let dEnd = this.datesForm.value.dEnd;
    this.serviceAchat.récupérerAllCommandes(dStart, dEnd);
  }

  private afficherDate(date : string): string{
    let d = new Date(date);
    return d.toLocaleDateString();
  }

  
}
