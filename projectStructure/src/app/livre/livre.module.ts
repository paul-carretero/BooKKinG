import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'rxjs/add/operator/map';
import { MenuRechercheComponent } from './menu-recherche/menu-recherche.component'
import { LivreService } from './livre.service';
import { ListeLivreComponent } from './liste-livre/liste-livre.component';
import { MenuAdministrateurComponent } from './menu-administrateur/menu-administrateur.component'
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpModule
  ],
  declarations: [
    MenuRechercheComponent,
    ListeLivreComponent,
    MenuAdministrateurComponent
    
  ],
  exports : [
    MenuRechercheComponent,
    ListeLivreComponent,
    MenuAdministrateurComponent
  ],
  providers : [
    LivreService
  ]
})
export class LivreModule { }