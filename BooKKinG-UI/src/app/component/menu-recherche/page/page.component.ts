import { Component, OnInit } from '@angular/core';
import { RechercheService } from '../../../service/recherche.service';

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

}
