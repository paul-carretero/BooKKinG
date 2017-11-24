import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandStepComponent } from './command-step.component';

describe('CommandStepComponent', () => {
  let component: CommandStepComponent;
  let fixture: ComponentFixture<CommandStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
