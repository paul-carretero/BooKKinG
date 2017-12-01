import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ConnectionPageComponent } from './connection-page/connection-page.component'
import { ConnectionModule } from '../connection/connection.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConnectionModule
  ],
  declarations: [
    ConnectionPageComponent
  ],
  exports : [
    ConnectionPageComponent
  ]
})
export class PagesComponentsModule { }
