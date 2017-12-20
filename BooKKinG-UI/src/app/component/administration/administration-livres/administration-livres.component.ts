import { Globals } from './../../../globals';
import { LivreService } from './../../../service/livre.service';
import { Livre } from './../../../model/livre';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdministrationService } from '../../../service/administration.service';
import { Ng4FilesSelected, Ng4FilesStatus, Ng4FilesService, Ng4FilesConfig } from 'angular4-files-upload';

@Component({
  selector: 'app-administration-livres',
  templateUrl: './administration-livres.component.html',
  styleUrls: ['./administration-livres.component.css']
})
export class AdministrationLivresComponent implements OnInit {

  public serverResponse: string;

  public createNewBookForm: FormGroup;

  public currentgenre = 'ANY';

  public currentType = 'ANY';

  public base64img: string;

  public imgLoading = false;

  public imgDragStatus = 'Drag And Drop Here!';

  private imgConf: Ng4FilesConfig = {
    acceptExtensions: ['jpg', 'jpeg'],
    maxFilesCount: 1,
    maxFileSize: 6291456, // 6MB
    totalFilesSize: 6291456 // 6MB
  };

  constructor(private fb: FormBuilder, private service: AdministrationService, private ng4FilesService: Ng4FilesService) {
    this.createNewBookForm = fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      summary: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.ng4FilesService.addConfig(this.imgConf);
  }

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

  public getDisplayable(str: string): string {
    return Globals.getDisplayableName(str);
  }

  private recupererDonneesForm(): Livre {
    const livre: Livre = new Livre();
    livre.title = this.createNewBookForm.value.title;
    livre.author = this.createNewBookForm.value.author;
    livre.type = this.currentType;
    livre.genre = this.currentgenre;
    livre.summary = this.createNewBookForm.value.summary;
    livre.price = this.createNewBookForm.value.price;
    livre.stock = this.createNewBookForm.value.stock;
    livre.picture = this.base64img;
    return livre;
  }

  public createNewBook() {
    const livre: Livre = this.recupererDonneesForm();
    this.service.ajouterNouveauLivre(livre);
  }

  public filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      switch (selectedFiles.status) {
        case Ng4FilesStatus.STATUS_MAX_FILE_SIZE_EXCEED:
          this.imgDragStatus = 'Image de trop grande taille';
          break;
        case Ng4FilesStatus.STATUS_MAX_FILES_COUNT_EXCEED:
          this.imgDragStatus = 'Trop d\'image';
          break;
        case Ng4FilesStatus.STATUS_MAX_FILES_TOTAL_SIZE_EXCEED:
          this.imgDragStatus = 'Images de trop grandes tailles';
          break;
        case Ng4FilesStatus.STATUS_NOT_MATCH_EXTENSIONS:
          this.imgDragStatus = 'Images au format JPG/JPEG uniquement';
          break;
      }
      return;
    }
    this.imgLoading = true;
    const img: File = selectedFiles.files.pop();
    this.handleFileSelect(img);
    this.imgDragStatus = 'Image "' + img.name + '" Chargée avec succès!';
  }

  handleFileSelect(file: File) {
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64img = btoa(binaryString);
    this.imgLoading = false;
  }
}
