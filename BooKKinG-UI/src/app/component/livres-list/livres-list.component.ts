import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';

@Component({
  selector: 'app-livres-list',
  templateUrl: './livres-list.component.html',
  styleUrls: ['./livres-list.component.css']
})
export class LivresListComponent implements OnInit {
  liste : Livre[] = [];


  constructor() { 

 /*   this.liste = [{id:1, titre:'titre1', auteur:'auteur1', prix:15},
    {id:1, titre:'titre2', auteur:'auteur2', prix:5}
    ];
    */
  }

  // fonction appelée lors de l'initialisation de la page html
  ngOnInit() {
   
  }

}
