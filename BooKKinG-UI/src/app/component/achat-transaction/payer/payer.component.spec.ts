import { ConnectionService } from './../../../service/connection.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerComponent } from './payer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { PanierService } from '../../../service/panier.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AchatService } from '../../../service/achat.service';
import { NavigationService } from '../../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';


describe('PayerComponent', () => {
  let component: PayerComponent;
  let fixture: ComponentFixture<PayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayerComponent],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        PanierService,
        ConnectionService,
        AchatService,
        NavigationService,
        CookieService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
