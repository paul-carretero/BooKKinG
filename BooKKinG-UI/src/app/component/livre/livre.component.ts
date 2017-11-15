import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {

  livre : Livre; 

  constructor() { }

  ngOnInit() {
  }

}
