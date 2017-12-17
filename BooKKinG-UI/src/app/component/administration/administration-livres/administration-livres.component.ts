import { Globals } from './../../../globals';
import { LivreService } from './../../../service/livre.service';
import { Livre } from './../../../model/livre';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-administration-livres',
  templateUrl: './administration-livres.component.html',
  styleUrls: ['./administration-livres.component.css']
})
export class AdministrationLivresComponent implements OnInit {

  private ajouter : boolean;


  private serverResponse: string;

  private createNewBookForm: FormGroup;

  private serverResponseClass = 'bg-danger';



  constructor(private fb: FormBuilder, private serviceLivre: LivreService) {
    this.createNewBookForm = fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      typeSelected: [''],
      genreSelected: [''],
      summary: [''],
      price: [0],
      stock:[0]
    });


   }

  ngOnInit() {
    console.log("dans admin");
    this.ajouter = false;
  }

  private ajouterLivre(){
    console.log("ajouter un livre dans la base de donnée");
    this.ajouter = true;
  }

  get types(): string[]{
    return Globals.typeLivre;
  }

  get genres():string[]{
    console.log("type selected : " + this.createNewBookForm.value.typeSelected);
    return Globals.genreLivres.get(this.createNewBookForm.value.typeSelected);
  }

  private displayableType(type: string): string {
    return Globals.getDisplayableName(type);
  }

  private displayableGenre(genre: string): string {
    return Globals.getDisplayableName(genre);
  }

  private recupererDonneesForm() : Livre{
    const livre: Livre = new Livre();
    livre.title = this.createNewBookForm.value.title;
    livre.author = this.createNewBookForm.value.author;
    livre.type = this.createNewBookForm.value.typeSelected;
    livre.genre = this.createNewBookForm.value.genreSelected;
    livre.summary = this.createNewBookForm.value.summary;
    livre.price = this.createNewBookForm.value.price;
    livre.stock = this.createNewBookForm.value.stock;
    console.log("titre livre : " + livre.title);
    console.log("auteur livre : " + livre.author);
    console.log("type livre : " + livre.type);
    console.log("genre livre : " + livre.genre);
    console.log("prix livre : " + livre.price);
    console.log("stock livre : " + livre.stock);
    console.log("résumé livre : " + livre.summary);
    return livre;
  }

  public createNewBook(){
    console.log("créer un nouveau livre dans la base de donnée");
    const livre: Livre = this.recupererDonneesForm();
    this.serviceLivre.ajouterNouveauLivre(livre);
  }


  
}
