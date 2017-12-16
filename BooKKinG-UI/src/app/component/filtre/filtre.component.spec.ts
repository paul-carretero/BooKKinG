import { RechercheService } from './../../service/recherche.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './../../service/navigation.service';
import { LRUCacheService } from './../../service/lrucache.service';
import { LivreService } from './../../service/livre.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreComponent } from './filtre.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { InitService } from '../../service/init.service';

describe('FiltreComponent', () => {
  let component: FiltreComponent;
  let fixture: ComponentFixture<FiltreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltreComponent
      ],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        LivreService,
        LRUCacheService,
        NavigationService,
        CookieService,
        RechercheService,
        InitService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
