import { AchatService } from './../../../service/achat.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCommandesComponent } from './historique-commandes.component';
import { HttpModule } from '@angular/http';
import { NavigationService } from '../../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { PanierService } from '../../../service/panier.service';
import { ConnectionService } from '../../../service/connection.service';
import { NotifService } from '../../../service/notif.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('HistoriqueCommandesComponent', () => {
  let component: HistoriqueCommandesComponent;
  let fixture: ComponentFixture<HistoriqueCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueCommandesComponent
      ],
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AchatService,
        NavigationService,
        CookieService,
        PanierService,
        ConnectionService,
        NotifService,
        ControlContainer
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
