import { Component, OnInit } from '@angular/core';
import { Recherche } from '../../service/recherche.service';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})

export class FiltreComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  genre_recherche :String = MenuRechercheComponent.genre;
  type:boolean;
  constructor() { }

  ngAfterViewInit() {
    console.log("ca marche");
    if(this.genre_recherche=='romans'){
      this.type = true;
      console.log('true');
    }else{
      this.type = false;
      console.log('false');      
    }
  }
}
