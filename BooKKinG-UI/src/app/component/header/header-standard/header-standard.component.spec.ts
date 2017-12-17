import { LRUCacheService } from './../../../service/lrucache.service';
import { RechercheService } from './../../../service/recherche.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './../../../service/navigation.service';
import { PanierService } from './../../../service/panier.service';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderStandardComponent } from './header-standard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ConnectionService } from '../../../service/connection.service';
import { NotifService } from '../../../service/notif.service';

describe('HeaderStandardComponent', () => {
  let component: HeaderStandardComponent;
  let fixture: ComponentFixture<HeaderStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderStandardComponent
      ],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ConnectionService,
        PanierService,
        NavigationService,
        CookieService,
        RechercheService,
        LRUCacheService,
        NotifService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
