import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonComponent } from './livraison.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ConnectionService } from '../../../service/connection.service';
import { AchatService } from '../../../service/achat.service';
import { NavigationService } from '../../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { PanierService } from '../../../service/panier.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotifService } from '../../../service/notif.service';

describe('LivraisonComponent', () => {
  let component: LivraisonComponent;
  let fixture: ComponentFixture<LivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LivraisonComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpModule,
        FormsModule
      ],
      providers: [
        ConnectionService,
        AchatService,
        NavigationService,
        CookieService,
        PanierService,
        NotifService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
