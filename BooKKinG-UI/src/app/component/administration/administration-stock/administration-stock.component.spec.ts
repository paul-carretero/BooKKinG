import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationStockComponent } from './administration-stock.component';

describe('AdministrationStockComponent', () => {
  let component: AdministrationStockComponent;
  let fixture: ComponentFixture<AdministrationStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
