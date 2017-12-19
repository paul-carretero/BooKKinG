import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsClientComponent } from './informations-client.component';
import { FormsModule, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { ConnectionService } from '../../../service/connection.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { NotifService } from '../../../service/notif.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InformationsClientComponent', () => {
  let component: InformationsClientComponent;
  let fixture: ComponentFixture<InformationsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InformationsClientComponent
      ],
      imports: [
        RouterTestingModule,
        HttpModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ConnectionService,
        NotifService,
        ControlContainer
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
