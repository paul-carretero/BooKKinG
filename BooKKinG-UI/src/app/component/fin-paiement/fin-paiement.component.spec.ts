import { ConnectionService } from './../../service/connection.service';
import { PanierService } from './../../service/panier.service';
import { HttpModule } from '@angular/http';
import { AchatService } from './../../service/achat.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPaiementComponent } from './fin-paiement.component';

describe('FinPaiementComponent', () => {
  let component: FinPaiementComponent;
  let fixture: ComponentFixture<FinPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinPaiementComponent 
      ],
      imports: [
        HttpModule
      ],
      providers: [
        AchatService, 
        PanierService,
        ConnectionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
