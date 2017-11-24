import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGenreComponent } from './category-genre.component';

describe('CategoryGenreComponent', () => {
  let component: CategoryGenreComponent;
  let fixture: ComponentFixture<CategoryGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
