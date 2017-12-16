import { ConnectionService } from './../../../service/connection.service';
import { PanierService } from './../../../service/panier.service';
import { HttpModule } from '@angular/http';
import { AchatService } from './../../../service/achat.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPaiementComponent } from './fin-paiement.component';
import { NavigationService } from '../../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { StockComponent } from '../../livre/stock/stock.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NotifService } from '../../../service/notif.service';


describe('FinPaiementComponent', () => {
  let component: FinPaiementComponent;
  let fixture: ComponentFixture<FinPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinPaiementComponent, StockComponent
      ],
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AchatService,
        PanierService,
        ConnectionService,
        NavigationService,
        CookieService,
        NotifService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
