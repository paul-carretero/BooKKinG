import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionComponent } from './inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectionService } from '../../../service/connection.service';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        ConnectionService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
