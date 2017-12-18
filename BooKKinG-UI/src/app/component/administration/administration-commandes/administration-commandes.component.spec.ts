import { NotifService } from './../../../service/notif.service';
import { ConnectionService } from './../../../service/connection.service';
import { PanierService } from './../../../service/panier.service';
import { LRUCacheService } from './../../../service/lrucache.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './../../../service/navigation.service';
import { HttpModule } from '@angular/http';
import { AchatService } from './../../../service/achat.service';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationCommandesComponent } from './administration-commandes.component';

describe('AdministrationCommandesComponent', () => {
  let component: AdministrationCommandesComponent;
  let fixture: ComponentFixture<AdministrationCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationCommandesComponent ],
      imports:[
        ReactiveFormsModule,
        HttpModule
      ],
      providers:[
        AchatService,
        NavigationService,
        CookieService,
        LRUCacheService,
        PanierService,
        ConnectionService,
        NotifService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
