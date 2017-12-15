import { LRUCacheService } from './../../service/lrucache.service';
import { RechercheService } from './../../service/recherche.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './../../service/navigation.service';
import { PanierService } from './../../service/panier.service';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ConnectionService } from '../../service/connection.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent 
      ],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ConnectionService, 
        PanierService,
        NavigationService,
        CookieService,
        RechercheService, 
        LRUCacheService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
