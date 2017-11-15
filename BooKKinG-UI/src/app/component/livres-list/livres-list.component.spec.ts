import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivresListComponent } from './livres-list.component';

describe('LivresListComponent', () => {
  let component: LivresListComponent;
  let fixture: ComponentFixture<LivresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
