import { RouterTestingModule } from '@angular/router/testing';
import { LRUCacheService } from './../../../service/lrucache.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './../../../service/navigation.service';
import { NotifService } from './../../../service/notif.service';
import { HttpModule } from '@angular/http';
import { AdministrationService } from './../../../service/administration.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationStockComponent } from './administration-stock.component';

describe('AdministrationStockComponent', () => {
  let component: AdministrationStockComponent;
  let fixture: ComponentFixture<AdministrationStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationStockComponent ],
      imports:[
        RouterTestingModule,
        HttpModule
      ],
      providers:[
        AdministrationService,
        NotifService,
        NavigationService,
        CookieService,
        LRUCacheService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
