import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandStepRoutingModule } from './command-step-routing.module';
import { CommandStepComponent } from './command-step.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';
import { ConfirmationStepComponent } from './confirmation-step/confirmation-step.component';

@NgModule({
  imports: [
    CommonModule,
    CommandStepRoutingModule
  ],
  declarations: [CommandStepComponent, PaymentStepComponent, ConfirmationStepComponent]
})
export class CommandStepModule { }
