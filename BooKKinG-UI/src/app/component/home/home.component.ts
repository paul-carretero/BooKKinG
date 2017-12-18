import { Component, OnInit, OnDestroy } from '@angular/core';
import { InitService } from '../../service/init.service';
import { Livre } from '../../model/livre';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationService } from '../../service/navigation.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { AbstractComponent } from '../abstract-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractComponent implements OnInit, OnDestroy {

  private static readonly displayTime = 2000;

  private static current = 0;

  private static readonly options = ['Nouveauté', 'Best-Seller', 'Suggestion'];

  private interval: any;

  constructor(private init: InitService, public router: Router, public navigationService: NavigationService) {
    super(router, navigationService);
  }

  ngOnInit() {
    this.interval = setInterval(this.next, HomeComponent.displayTime);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private onMouseEnter(): void {
    clearInterval(this.interval);
  }

  private onMouseLeave(): void {
    this.interval = setInterval(this.next, HomeComponent.displayTime);
  }

  private setCurrent(n: number): void {
    HomeComponent.current = n;
  }

  private isActiveClass(n: number): string {
    if (HomeComponent.current === n) {
      return 'active';
    }
    return '';
  }

  private next(): void {
    if (HomeComponent.current < (HomeComponent.options.length - 1)) {
      HomeComponent.current++;
    } else {
      HomeComponent.current = 0;
    }
  }

  get currentOption(): string {
    return HomeComponent.options[HomeComponent.current];
  }

  get currentBook(): Livre {
    switch (HomeComponent.current) {
      case 0: {
        return this.init.getNewestBook() || new Livre();
      }
      case 1: {
        return this.init.getMostBuyBook() || new Livre();
      }
      default: {
        return this.init.getRandomBook() || new Livre();
      }
    }
  }

  private goToBook(): void {
    if (this.currentBook) {
      this.detailLivre(this.currentBook);
    }
  }

  private getSummarizedSummary(): string {
    if (!this.currentBook.summary) {
      return '';
    }
    let points = '';
    if (this.currentBook.summary.length > 256) {
      points = '...';
    }
    return this.currentBook.summary.substring(0, 256) + points;
  }
}
