import { NotifService } from './../../../service/notif.service';
import { HttpModule } from '@angular/http';
import { AdministrationService } from './../../../service/administration.service';
import { Ng4FilesModule } from 'angular4-files-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationLivresComponent } from './administration-livres.component';

describe('AdministrationLivresComponent', () => {
  let component: AdministrationLivresComponent;
  let fixture: ComponentFixture<AdministrationLivresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationLivresComponent ],
      imports:[
        ReactiveFormsModule,
        Ng4FilesModule,
        HttpModule
      ],
      providers:[
        AdministrationService,
        NotifService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationLivresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
