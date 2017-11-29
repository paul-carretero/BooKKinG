import { AdministrationService } from './service/administration.service';
import { Globals } from './globals';
import { RechercheService } from './service/recherche.service';
import { ConnectionService } from './service/connection.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { PanierComponent } from './component/panier/panier.component';
import { MenuRechercheComponent } from './component/menu-recherche/menu-recherche.component';
import { ConnectionComponent } from './composant/connection/connection.component';
import { CompteClientComponent } from './component/compte-client/compte-client.component';
import { Http, HttpModule } from '@angular/http';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { PayerComponent } from './component/payer/payer.component';
import { LivraisonComponent } from './component/livraison/livraison.component';
import { FinPaiementComponent } from './component/fin-paiement/fin-paiement.component';
import { AdministrationComponent } from './component/administration/administration.component';




// constante regroupant les routes vers les différents pages liées aux composants
// ! le nom du path est celui utilisé dans les liens dans app.component.html
export const appRoutes: Routes = [
  { path: 'panier',component: PanierComponent },
  { path: 'menu-recherche', component: MenuRechercheComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'payer', component: PayerComponent },
  { path: 'livraison', component: LivraisonComponent },
  { path: 'finPaiement', component: FinPaiementComponent }, 
  { path: 'admin', component: AdministrationComponent}
     
];




@NgModule({
  // composants que va utiliser l'application
  declarations: [
    AppComponent,
    PanierComponent,
    MenuRechercheComponent,
    ConnectionComponent,
    CompteClientComponent,
    InscriptionComponent,
    PayerComponent,
    LivraisonComponent,
    FinPaiementComponent,
    AdministrationComponent
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
    Globals,
    ConnectionService,
    RechercheService, 
    AdministrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
