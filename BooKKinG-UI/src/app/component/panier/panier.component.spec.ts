import { ConnectionService } from './../../service/connection.service';
import { PanierService } from './../../service/panier.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { AchatService } from '../../service/achat.service';
import { NavigationService } from '../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotifService } from '../../service/notif.service';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanierComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        PanierService,
        ConnectionService,
        AchatService,
        NavigationService,
        CookieService,
        NotifService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
