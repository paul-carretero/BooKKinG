import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRechercheComponent } from './menu-recherche.component';

describe('MenuRechercheComponent', () => {
  let component: MenuRechercheComponent;
  let fixture: ComponentFixture<MenuRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
