import { ConnectionService } from './../../service/connection.service';
import { PanierService } from './../../service/panier.service';
import { LRUCacheService } from './../../service/lrucache.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './../../service/navigation.service';
import { RechercheService } from './../../service/recherche.service';
import { PageComponent } from './page/page.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRechercheComponent } from './menu-recherche.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotifService } from '../../service/notif.service';

describe('MenuRechercheComponent', () => {
  let component: MenuRechercheComponent;
  let fixture: ComponentFixture<MenuRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRechercheComponent,
        PageComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        RechercheService,
        NavigationService,
        CookieService,
        LRUCacheService,
        PanierService,
        ConnectionService,
        NotifService
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
