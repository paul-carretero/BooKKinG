import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArianeComponent } from './ariane.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationService } from '../../service/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../../globals';

describe('ArianeComponent', () => {
  let component: ArianeComponent;
  let fixture: ComponentFixture<ArianeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArianeComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        CookieService,
        NavigationService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArianeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
