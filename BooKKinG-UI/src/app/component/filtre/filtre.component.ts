import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from '../../service/connection.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Recherche } from '../../service/recherche.service';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent implements OnInit {
  static type: any;    
   type:boolean = false;
  constructor() { }
  
  ngOnInit() {
  
  }
  
  /* static test(){
    FiltreComponent.genre_recherche = MenuRechercheComponent.genre;
      if(FiltreComponent.genre_recherche=='romans'){
      this.type = true;
      console.log('true');
    }else{
      this.type = false;
      console.log('false');      
    }
    
  }*/

}
