import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsClientComponent } from './informations-client.component';
import { FormsModule } from '@angular/forms';
import { ConnectionService } from '../../service/connection.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('InformationsClientComponent', () => {
  let component: InformationsClientComponent;
  let fixture: ComponentFixture<InformationsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationsClientComponent 
      ],
      imports: [ 
        RouterTestingModule,
        HttpModule,
        FormsModule
      ],
      providers: [
        ConnectionService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
