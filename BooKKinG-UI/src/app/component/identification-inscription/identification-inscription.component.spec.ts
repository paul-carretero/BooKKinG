import { ConnectionService } from './../../service/connection.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ConnectionComponent } from './connection/connection.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationInscriptionComponent } from './identification-inscription.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AchatService } from '../../service/achat.service';
import { NavigationService } from '../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { PanierService } from '../../service/panier.service';

describe('IdentificationInscriptionComponent', () => {
  let component: IdentificationInscriptionComponent;
  let fixture: ComponentFixture<IdentificationInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentificationInscriptionComponent,
        InscriptionComponent,
        ConnectionComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpModule,
        ReactiveFormsModule
      ],
      providers: [
        ConnectionService,
        AchatService,
        NavigationService,
        CookieService,
        PanierService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
