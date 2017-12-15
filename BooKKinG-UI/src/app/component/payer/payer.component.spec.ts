import { ConnectionService } from './../../service/connection.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerComponent } from './payer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { PanierService } from '../../service/panier.service';

describe('PayerComponent', () => {
  let component: PayerComponent;
  let fixture: ComponentFixture<PayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerComponent ],
      imports: [ 
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        PanierService,
        ConnectionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
