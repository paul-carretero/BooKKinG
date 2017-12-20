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

  get displayedLivre(): number {
    return this.service.getLastLivreList().length;
  }

  get totalDisplayableLivre(): number {
    return this.service.getAvailableResults();
  }

  get minLivre(): number {
    return Globals.pageSize * (this.currentPage - 1) + 1;
  }

  get maxLivre(): number {
    return this.minLivre + this.displayedLivre - 1;
  }

  get availablePage(): number[] {
    const res = new Array(this.service.getAvailablePages());
    let i = 0;
    while (i < res.length) {
      res[i] = i + 1;
      i++;
    }
    return res;
  }

  get currentPage(): number {
    return this.service.getCurrentPage();
  }

  public setPage(iPage: number): void {
    this.service.setCurrentPage(iPage);
  }

  public nextPage(): void {
    if (this.currentPage < this.service.getAvailablePages()) {
      this.service.setCurrentPage(this.currentPage + 1);
    }
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.service.setCurrentPage(this.currentPage - 1);
    }
  }

}
