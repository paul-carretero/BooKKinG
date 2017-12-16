import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionComponent } from './connection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ConnectionService } from '../../../service/connection.service';
import { HttpModule } from '@angular/http';
import { AchatService } from '../../../service/achat.service';
import { NavigationService } from '../../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { PanierService } from '../../../service/panier.service';
import { NotifService } from '../../../service/notif.service';

describe('ConnectionComponent', () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpModule
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
    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
