import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationInscriptionComponent } from './identification-inscription.component';

describe('IdentificationInscriptionComponent', () => {
  let component: IdentificationInscriptionComponent;
  let fixture: ComponentFixture<IdentificationInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
