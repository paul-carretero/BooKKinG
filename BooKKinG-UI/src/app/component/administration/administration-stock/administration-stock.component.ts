import { Component, OnInit } from '@angular/core';
import { LivreService } from '../../../service/livre.service';
import { Livre } from '../../../model/livre';
import { NavigationService } from '../../../service/navigation.service';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';
import { AdministrationService } from '../../../service/administration.service';
import { AbstractComponent } from '../../abstract-component';

@Component({
  selector: 'app-administration-stock',
  templateUrl: './administration-stock.component.html',
  styleUrls: ['./administration-stock.component.css']
})
export class AdministrationStockComponent extends AbstractComponent implements OnInit {

  constructor(private service: AdministrationService, public navigationService: NavigationService, public router: Router) {
    super(router, navigationService);
  }

  ngOnInit() {
    this.service.getAllLivres();
  }

  get allLivres(): Livre[] {
    return this.service.getAllLivres();
  }

  private modifierStockLivres() {
    this.service.récupérerAllLivres();
  }

  private setQuantity(livre: Livre, quantity: string) {
    const quantiteLivre = Number(quantity);
    this.service.setQuantity(livre.idBook, quantiteLivre);
  }
}
