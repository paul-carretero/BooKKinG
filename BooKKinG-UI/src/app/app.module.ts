import { ConnectionService } from './service/connection.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { PanierComponent } from './component/panier/panier.component';
import { BarreRechercheComponent } from './component/barre-recherche/barre-recherche.component';
import { MenuRechercheComponent } from './component/menu-recherche/menu-recherche.component';
import { RechercheAvanceeComponent } from './component/recherche-avancee/recherche-avancee.component';
import { LivreComponent } from './component/livre/livre.component';
import { LivresListComponent } from './component/livres-list/livres-list.component';
import { ConnectionComponent } from './composant/connection/connection.component';
import { CompteClientComponent } from './component/compte-client/compte-client.component';
import { Http, HttpModule } from '@angular/http';





// constante regroupant les routes vers les différents pages liées aux composants
// ! le nom du path est celui utilisé dans les liens dans app.component.html
export const appRoutes: Routes = [
  { path: 'panier',component: PanierComponent },
  { path: 'menu-recherche', component: MenuRechercheComponent },
  { path: 'barre-recherche', component: BarreRechercheComponent },
  { path: 'listeLivre', component: LivresListComponent }, 
  { path: 'connection', component: ConnectionComponent }  
];




@NgModule({
  // composants que va utiliser l'application
  declarations: [
    AppComponent,
    PanierComponent,
    BarreRechercheComponent,
    MenuRechercheComponent,
    RechercheAvanceeComponent,
    LivreComponent,
    LivresListComponent,
    ConnectionComponent,
    CompteClientComponent
  ],
  // modules que l'application va utiliser 
  // ! penser à y mettre aussi les modules pour les formulaires
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash : true}),
    FormsModule, 
    HttpModule
  ],
  // fournisseur de services dans l'application
  providers: [
    ConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 



}
