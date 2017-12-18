import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationLivresComponent } from './administration-livres.component';

describe('AdministrationLivresComponent', () => {
  let component: AdministrationLivresComponent;
  let fixture: ComponentFixture<AdministrationLivresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationLivresComponent ]
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
