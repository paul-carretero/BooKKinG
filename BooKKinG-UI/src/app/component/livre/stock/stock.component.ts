import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Livre } from '../../../model/livre';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {

  @Input()
  private updateQuantity: Subject<number>;

  @Input()
  private stock: number;

  private warning: boolean;

  constructor() {
    this.warning = false;
  }

  ngOnInit() {
    if (this.updateQuantity != null) {
      this.subscribe();
    }
  }

  ngOnDestroy() {
    this.updateQuantity.unsubscribe();
  }

  private subscribe(): void {
    this.updateQuantity.subscribe(event => {
      if (event > this.stock) {
        this.warning = true;
      } else {
        this.warning = false;
      }
    });
  }

}
