import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchComponent } from './research.component';
import { SharedModule } from '../shared/index';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ResearchComponent
  ]
})
export class ResearchModule { }
