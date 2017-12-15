import { Component, OnInit } from '@angular/core';
import { RechercheService } from '../../../service/recherche.service';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private service: RechercheService) { }

  ngOnInit() {
  }

  private get displayedLivre(): number {
    return this.service.getLastLivreList().length;
  }

  private get totalDisplayableLivre(): number {
    return this.service.getAvailableResults();
  }

  private get minLivre(): number {
    return Globals.pageSize * (this.currentPage - 1) + 1;
  }

  private get maxLivre(): number {
    return this.minLivre + this.displayedLivre - 1;
  }

  private get availablePage(): number[] {
    const res = new Array(this.service.getAvailablePages());
    let i = 0;
    while (i < res.length) {
      res[i] = i + 1;
      i++;
    }
    return res;
  }

  private get currentPage(): number {
    return this.service.getCurrentPage();
  }

  private setPage(iPage: number): void {
    this.service.setCurrentPage(iPage);
  }

  private nextPage(): void {
    if (this.currentPage < this.service.getAvailablePages()) {
      this.service.setCurrentPage(this.currentPage + 1);
    }
  }

  private prevPage(): void {
    if (this.currentPage > 1) {
      this.service.setCurrentPage(this.currentPage - 1);
    }
  }

}
