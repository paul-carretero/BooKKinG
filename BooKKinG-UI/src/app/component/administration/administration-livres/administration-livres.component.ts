import { Globals } from './../../../globals';
import { LivreService } from './../../../service/livre.service';
import { Livre } from './../../../model/livre';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdministrationService } from '../../../service/administration.service';

@Component({
  selector: 'app-administration-livres',
  templateUrl: './administration-livres.component.html',
  styleUrls: ['./administration-livres.component.css']
})
export class AdministrationLivresComponent implements OnInit {

  private serverResponse: string;

  private createNewBookForm: FormGroup;

  private currentgenre = 'ANY';

  private currentType = 'ANY';

  constructor(private fb: FormBuilder, private service: AdministrationService) {
    this.createNewBookForm = fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      summary: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required],
    });
  }

  ngOnInit() { }

  get types(): string[] {
    return Globals.typeLivre;
  }

  get genres(): string[] {
    return Globals.genreLivres.get(this.currentType);
  }

  private setGenre(nGenre: string): void {
    this.currentgenre = nGenre;
  }

  private setType(nType: string): void {
    this.currentgenre = 'ANY';
    this.currentType = nType;
  }

  private getClassType(t: string): string {
    if (t === this.currentType) {
      return 'active';
    }
    return '';
  }

  private getClassGenre(g: string): string {
    if (g === this.currentgenre) {
      return 'active';
    }
    return '';
  }

  private getDisplayable(str: string): string {
    return Globals.getDisplayableName(str);
  }

  private recupererDonneesForm(): Livre {
    const livre: Livre = new Livre();
    livre.title = this.createNewBookForm.value.title;
    livre.author = this.createNewBookForm.value.author;
    livre.type = this.createNewBookForm.value.typeSelected;
    livre.genre = this.createNewBookForm.value.genreSelected;
    livre.summary = this.createNewBookForm.value.summary;
    livre.price = this.createNewBookForm.value.price;
    livre.stock = this.createNewBookForm.value.stock;
    return livre;
  }

  public createNewBook() {
    console.log('créer un nouveau livre dans la base de donnée');
    const livre: Livre = this.recupererDonneesForm();
    this.service.ajouterNouveauLivre(livre);
  }
}
