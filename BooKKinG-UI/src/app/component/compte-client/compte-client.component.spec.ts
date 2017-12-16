import { InformationsClientComponent } from './../informations-client/informations-client.component';
import { HistoriqueCommandesComponent } from './../historique-commandes/historique-commandes.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteClientComponent } from './compte-client.component';
import { FormsModule } from '@angular/forms';
import { AchatService } from '../../service/achat.service';
import { HttpModule } from '@angular/http';
import { ConnectionService } from '../../service/connection.service';
import { NavigationService } from '../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { PanierService } from '../../service/panier.service';

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
        HttpModule
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
    fixture = TestBed.createComponent(CompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
