import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RechercheService } from '../../../service/recherche.service';
import { HttpModule } from '@angular/http';
import { NavigationService } from '../../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { LRUCacheService } from '../../../service/lrucache.service';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ 
        HttpModule
      ],
      providers: [
        RechercheService,
        NavigationService,
        CookieService,
        LRUCacheService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
