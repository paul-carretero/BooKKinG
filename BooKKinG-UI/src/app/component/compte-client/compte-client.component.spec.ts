import { InformationsClientComponent } from './informations-client/informations-client.component';
import { HistoriqueCommandesComponent } from './historique-commandes/historique-commandes.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteClientComponent } from './compte-client.component';
import { FormsModule, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { AchatService } from '../../service/achat.service';
import { HttpModule } from '@angular/http';
import { ConnectionService } from '../../service/connection.service';
import { NavigationService } from '../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { PanierService } from '../../service/panier.service';
import { NotifService } from '../../service/notif.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompteClientComponent', () => {
  let component: CompteClientComponent;
  let fixture: ComponentFixture<CompteClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompteClientComponent,
        HistoriqueCommandesComponent,
        InformationsClientComponent
      ],
      imports: [
        FormsModule,
        HttpModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ConnectionService,
        AchatService,
        NavigationService,
        CookieService,
        PanierService,
        NotifService,
        ControlContainer,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
