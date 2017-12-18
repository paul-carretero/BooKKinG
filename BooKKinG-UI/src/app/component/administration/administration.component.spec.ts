import { LRUCacheService } from './../../service/lrucache.service';
import { NavigationService } from './../../service/navigation.service';
import { Ng4FilesModule } from 'angular4-files-upload';
import { AdministrationCommandesComponent } from './administration-commandes/administration-commandes.component';
import { AdministrationStockComponent } from './administration-stock/administration-stock.component';
import { AdministrationLivresComponent } from './administration-livres/administration-livres.component';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationComponent } from './administration.component';
import { AdministrationService } from '../../service/administration.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Globals } from '../../globals';
import { FiltreComponent } from '../filtre/filtre.component';
import { ArianeComponent } from '../ariane/ariane.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PanierService } from '../../service/panier.service';
import { ConnectionService } from '../../service/connection.service';
import { RechercheService } from '../../service/recherche.service';
import { AchatService } from '../../service/achat.service';
import { CookieService } from 'ngx-cookie-service';
import { LivreService } from '../../service/livre.service';
import { NotifService } from '../../service/notif.service';

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdministrationComponent, 
        AdministrationLivresComponent,
        AdministrationStockComponent,
        AdministrationCommandesComponent
      ],
      imports: [
        RouterTestingModule,
        HttpModule,
        ReactiveFormsModule,
        Ng4FilesModule
      ],
      providers: [
        ConnectionService,
        AdministrationService,
        NotifService,
        NavigationService,
        CookieService,
        LRUCacheService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
