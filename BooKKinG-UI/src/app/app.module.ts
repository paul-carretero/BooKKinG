import { HistoriquePagesService } from './service/historique-pages.service';
import { AchatService } from './service/achat.service';
import { PanierService } from './service/panier.service';
import { AdministrationService } from './service/administration.service';
import { Globals } from './globals';
import { RechercheService } from './service/recherche.service';
import { ConnectionService } from './service/connection.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LRUCacheService } from './service/lrucache.service';
import { InitService } from './service/init.service';
import { NotifService } from './service/notif.service';

import { AppComponent } from './app.component';
import { PanierComponent } from './component/panier/panier.component';
import { MenuRechercheComponent } from './component/menu-recherche/menu-recherche.component';
import { CompteClientComponent } from './component/compte-client/compte-client.component';
import { Http, HttpModule } from '@angular/http';
import { PayerComponent } from './component/achat-transaction/payer/payer.component';
import { LivraisonComponent } from './component/achat-transaction/livraison/livraison.component';
import { FinPaiementComponent } from './component/achat-transaction/fin-paiement/fin-paiement.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { LivreComponent } from './component/livre/livre.component';
import { HeaderComponent } from './component/header/header.component';
import { FiltreComponent } from './component/filtre/filtre.component';
import { IdentificationInscriptionComponent } from './component/identification-inscription/identification-inscription.component';
import { HistoriqueCommandesComponent } from './component/historique-commandes/historique-commandes.component';
import { CookieService } from 'ngx-cookie-service';
import { LivreService } from './service/livre.service';
import { ArianeComponent } from './component/ariane/ariane.component';
import { NavigationService } from './service/navigation.service';
import { StockComponent } from './component/livre/stock/stock.component';
import { TooltipDirective } from 'ng2-tooltip-directive/components';
import { HeaderPaiementComponent } from './component/header/header-paiement/header-paiement.component';
import { InformationsClientComponent } from './component/informations-client/informations-client.component';
import { PageComponent } from './component/menu-recherche/page/page.component';
import { HomeComponent } from './component/home/home.component';
import { ReturnButtonComponent } from './component/ariane/return-button/return-button.component';
import { HeaderStandardComponent } from './component/header/header-standard/header-standard.component';
import { InscriptionComponent } from './component/identification-inscription/inscription/inscription.component';
import { ConnectionComponent } from './component/identification-inscription/connection/connection.component';
import { NotifComponent } from './component/ariane/notif/notif.component';
import { AdministrationLivresComponent } from './component/administration/administration-livres/administration-livres.component';
import { AdministrationCommandesComponent } from './component/administration/administration-commandes/administration-commandes.component';




// constante regroupant les routes vers les différents pages liées aux composants
// ! le nom du path est celui utilisé dans les liens dans app.component.html
export const appRoutes: Routes = [
  { path: 'panier', component: PanierComponent },
  { path: 'menu-recherche', component: MenuRechercheComponent },
  { path: 'identification-inscription', component: IdentificationInscriptionComponent },
  { path: 'payer', component: PayerComponent },
  { path: 'livraison', component: LivraisonComponent },
  { path: 'finPaiement', component: FinPaiementComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'compte', component: CompteClientComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
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
    StockComponent,
    HeaderPaiementComponent,
    TooltipDirective,
    InformationsClientComponent,
    PageComponent,
    HomeComponent,
    ReturnButtonComponent,
    HeaderStandardComponent,
    NotifComponent,
    AdministrationLivresComponent,
    AdministrationCommandesComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  // modules que l'application va utiliser
  // ! penser à y mettre aussi les modules pour les formulaires
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // fournisseur de services dans l'application
  providers: [
    Globals,
    PanierService,
    ConnectionService,
    RechercheService,
    AdministrationService,
    AchatService,
    CookieService,
    LivreService,
    NavigationService,
    LRUCacheService,
    HistoriquePagesService,
    InitService,
    NotifService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
