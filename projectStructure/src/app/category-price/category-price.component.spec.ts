import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPriceComponent } from './category-price.component';

describe('CategoryPriceComponent', () => {
  let component: CategoryPriceComponent;
  let fixture: ComponentFixture<CategoryPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
