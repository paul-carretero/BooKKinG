import { Component, OnInit } from '@angular/core';
import { LivreService } from '../../../service/livre.service';
import { Livre } from '../../../model/livre';
import { NavigationService } from '../../../service/navigation.service';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';
import { AdministrationService } from '../../../service/administration.service';

@Component({
  selector: 'app-administration-stock',
  templateUrl: './administration-stock.component.html',
  styleUrls: ['./administration-stock.component.css']
})
export class AdministrationStockComponent implements OnInit {

  constructor(private service: AdministrationService, private navService: NavigationService, private router: Router) { }

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

  private goToLivre(livre: Livre): void {
    this.navService.setFromLivre(livre);
    this.router.navigate([Globals.getRoute(Globals.LIVRE), livre.idBook]);
  }
}
