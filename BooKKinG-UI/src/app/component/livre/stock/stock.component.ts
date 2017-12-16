import { Component, OnInit, Input } from '@angular/core';
import { Livre } from '../../../model/livre';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @Input()
  private stock: number;

  constructor() { }

  ngOnInit() { }

}
