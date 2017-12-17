import { Component, OnInit, OnDestroy } from '@angular/core';
import { InitService } from '../../service/init.service';
import { Livre } from '../../model/livre';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private static readonly displayTime = 2000;

  private static current = 0;

  private static readonly options = ['Nouveauté', 'Meilleure Vente', 'Suggestion'];

  private interval: any;

  constructor(private init: InitService) { }

  ngOnInit() {
    this.interval = setInterval(this.next, HomeComponent.displayTime);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
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

  get options(): string[] {
    return HomeComponent.options;
  }

  get currentBook(): Livre {
    switch (HomeComponent.current) {
      case 0: {
        return this.init.getNewestBook();
      }
      case 1: {
        return this.init.getMostBuyBook();
      }
      default: {
        return this.init.getRandomBook();
      }
    }
  }
}
