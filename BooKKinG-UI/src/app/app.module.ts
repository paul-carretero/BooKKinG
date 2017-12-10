import { AchatService } from './service/achat.service';
import { PanierService } from './service/panier.service';
import { AdministrationService } from './service/administration.service';
import { Globals } from './globals';
import { RechercheService } from './service/recherche.service';
import { ConnectionService } from './service/connection.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

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
import { LivreComponent } from './component/livre/livre.component';
import { HeaderComponent } from './component/header/header.component';
import { FiltreComponent } from './component/filtre/filtre.component';
import { IdentificationInscriptionComponent } from './component/identification-inscription/identification-inscription.component';
import { HistoriqueCommandesComponent } from './component/historique-commandes/historique-commandes.component';
import { CookieService } from 'ngx-cookie-service';
import { LivreService } from './service/livre.service';
import { ArianeComponent } from './component/ariane/ariane.component';



// constante regroupant les routes vers les différents pages liées aux composants
// ! le nom du path est celui utilisé dans les liens dans app.component.html
export const appRoutes: Routes = [
  { path: 'livre', component: LivreComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'menu-recherche', component: MenuRechercheComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'identification-inscription', component: IdentificationInscriptionComponent },
  { path: 'payer', component: PayerComponent },
  { path: 'livraison', component: LivraisonComponent },
  { path: 'finPaiement', component: FinPaiementComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'compte', component: CompteClientComponent },
  { path: 'commandes', component: HistoriqueCommandesComponent },
  { path: 'livre/:id', component: LivreComponent }
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
    AdministrationComponent,
    LivreComponent,
    HeaderComponent,
    FiltreComponent,
    IdentificationInscriptionComponent,
    HistoriqueCommandesComponent,
    ArianeComponent,
  ],
  // modules que l'application va utiliser
  // ! penser à y mettre aussi les modules pour les formulaires
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule,
  ],
  // fournisseur de services dans l'application
  providers: [
    Globals,
    ConnectionService,
    RechercheService,
    AdministrationService,
    PanierService,
    AchatService,
    CookieService,
    LivreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
