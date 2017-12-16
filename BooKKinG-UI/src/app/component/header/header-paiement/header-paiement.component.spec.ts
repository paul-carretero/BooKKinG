import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderPaiementComponent } from './header-paiement.component';
import { AchatService } from '../../../service/achat.service';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationService } from '../../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { PanierService } from '../../../service/panier.service';
import { ConnectionService } from '../../../service/connection.service';
import { NotifService } from '../../../service/notif.service';


describe('HeaderPaiementComponent', () => {
  let component: HeaderPaiementComponent;
  let fixture: ComponentFixture<HeaderPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPaiementComponent],
      providers: [
        AchatService,
        NavigationService,
        CookieService,
        PanierService,
        ConnectionService,
        NotifService
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
