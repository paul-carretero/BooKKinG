import { ConnectionService } from './../../service/connection.service';
import { AchatService } from './../../service/achat.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { HeaderComponent } from '../header/header.component';
import { Globals } from '../../globals';
import { NavigationService } from '../../service/navigation.service';
import { RechercheService } from '../../service/recherche.service';
import { InitService } from '../../service/init.service';
import { AbstractComponent } from '../abstract-component';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css'],
})

export class FiltreComponent extends AbstractComponent implements OnInit {

  private minPrice = 0;

  private maxPrice = 100;

  private minMinPrice = 0;

  private maxMaxPrice = 100;

  constructor(public router: Router, public navigationService: NavigationService,
    private rechercheService: RechercheService, private initService: InitService,
    private serviceAchat: AchatService, private serviceConnection: ConnectionService) {
    super(router, navigationService);
  }

  ngOnInit() {
    const conn = this.initService.initConstantes().subscribe(
      reponse => {
        if (reponse.success) {
          this.maxMaxPrice = reponse.max;
          this.maxPrice = reponse.max;
          this.minPrice = reponse.min;
          this.minMinPrice = reponse.min;
        }
        conn.unsubscribe();
      }
    );
  }

  get classTransaction(): string {
    if (Globals.transactionPage.includes(this.navigationService.getCurrentOther())) {
      return 'nodisplay';
    }
    return '';
  }

  get classPrixFiltre(): string {
    if (this.navigationService.getCurrentOther() === Globals.RECHERCHE) {
      return '';
    }
    return 'nodisplay';
  }

  get isInTransaction(): boolean {
    return Globals.transactionPage.includes(this.navigationService.getCurrentOther())
      && !this.isEndTransaction;
  }

  /**
  * Récupérer l'adresse de l'utilisateur
  * @param :rien
  * @return: une chaine de charactères
  */
  get adresseLivraison(): string {
    return this.serviceAchat.getCommandeCourante().shippingAddress;
  }

  /**
  * Récupérer le nom de l'utilisateur
  * @param :rien
  * @return: une chaine de charactères
  */
  get nomPaiement(): string {
    return this.serviceConnection.getCurrentUser().name;
  }

  /**
  * Récupérer l'adresse de l'utilisateur
  * @param :rien
  * @return: une chaine de charactères
  */
  get adressePaiement(): string {
    return this.serviceConnection.getCurrentUser().address;
  }

  get isEndTransaction(): boolean {
    return Globals.FIN_PAIEMENT === this.navigationService.getCurrentOther();
  }

  /**
  * Récupérer les genres du livres
  * @param :rien
  * @return: un tableau de chaine de charactères
  */
  get genres(): string[] {
    const currentType = this.navigationService.getCurrentType();
    if (Globals.typeLivre.includes(currentType)) {
      return Globals.genreLivres.get(currentType);
    } else {
      return Globals.genreLivres.get('ANY');
    }
  }

  get canDisplayAny(): boolean {
    return this.navigationService.getCurrentType() != null && this.navigationService.getCurrentType() !== 'ANY';
  }

  get currentGenre(): string {
    return this.navigationService.getCurrentGenre();
  }

  private setCurrentGenre(newGenre: string): void {
    this.navigationService.setCurrentGenre(newGenre);
    this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
  }

  private onPriceChange(raw: string, update: boolean): void {
    const tab = raw.split(',');
    this.minPrice = Number(tab[0]);
    this.maxPrice = Number(tab[1]);
    if (update) {
      this.rechercheService.setMinPrice(Number(tab[0]));
      this.rechercheService.setMaxPrice(Number(tab[1]));
    }
  }
}
