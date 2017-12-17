import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationCommandesComponent } from './administration-commandes.component';

describe('AdministrationCommandesComponent', () => {
  let component: AdministrationCommandesComponent;
  let fixture: ComponentFixture<AdministrationCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
