import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FiltreComponent } from './component/filtre/filtre.component';
import { ArianeComponent } from './component/ariane/ariane.component';
import { HeaderComponent } from './component/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LRUCacheService } from './service/lrucache.service';
import { NavigationService } from './service/navigation.service';
import { LivreService } from './service/livre.service';
import { CookieService } from 'ngx-cookie-service';
import { AchatService } from './service/achat.service';
import { AdministrationService } from './service/administration.service';
import { RechercheService } from './service/recherche.service';
import { ConnectionService } from './service/connection.service';
import { PanierService } from './service/panier.service';
import { Globals } from './globals';
import { Http, ConnectionBackend } from '@angular/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { InitService } from './service/init.service';
import { NotifService } from './service/notif.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FiltreComponent,
        ArianeComponent,
        HeaderComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpModule,
        BrowserModule,
        FormsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
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
        InitService,
        NotifService
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

  }));
  /*it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  /*it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));*/
});
