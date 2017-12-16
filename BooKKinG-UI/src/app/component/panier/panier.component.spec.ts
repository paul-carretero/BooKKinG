import { ConnectionService } from './../../service/connection.service';
import { PanierService } from './../../service/panier.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { AchatService } from '../../service/achat.service';
import { NavigationService } from '../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanierComponent],
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
