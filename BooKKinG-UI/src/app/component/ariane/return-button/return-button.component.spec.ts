import { LRUCacheService } from './../../../service/lrucache.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './../../../service/navigation.service';
import { HistoriquePagesService } from './../../../service/historique-pages.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnButtonComponent } from './return-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { AchatService } from '../../../service/achat.service';
import { PanierService } from '../../../service/panier.service';
import { ConnectionService } from '../../../service/connection.service';
import { NotifService } from '../../../service/notif.service';

describe('ReturnButtonComponent', () => {
  let component: ReturnButtonComponent;
  let fixture: ComponentFixture<ReturnButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnButtonComponent],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        HistoriquePagesService,
        NavigationService,
        CookieService,
        LRUCacheService,
        AchatService,
        PanierService,
        ConnectionService,
        NotifService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
