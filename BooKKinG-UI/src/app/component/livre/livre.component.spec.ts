import { ConnectionService } from './../../service/connection.service';
import { PanierService } from './../../service/panier.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './../../service/navigation.service';
import { LRUCacheService } from './../../service/lrucache.service';
import { LivreService } from './../../service/livre.service';
import { StockComponent } from './stock/stock.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreComponent } from './livre.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('LivreComponent', () => {
  let component: LivreComponent;
  let fixture: ComponentFixture<LivreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivreComponent,
        StockComponent
       ],
       imports: [ 
        RouterTestingModule,
        HttpModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        LivreService,
        LRUCacheService,
        NavigationService,
        CookieService,
        PanierService,
        ConnectionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
