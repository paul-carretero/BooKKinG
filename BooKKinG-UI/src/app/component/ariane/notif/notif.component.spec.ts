import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifComponent } from './notif.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotifService } from '../../../service/notif.service';

describe('NotifComponent', () => {
  let component: NotifComponent;
  let fixture: ComponentFixture<NotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotifComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [NotifService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
