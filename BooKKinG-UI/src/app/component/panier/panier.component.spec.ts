import { ConnectionService } from './../../service/connection.service';
import { PanierService } from './../../service/panier.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanierComponent ],
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
    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
