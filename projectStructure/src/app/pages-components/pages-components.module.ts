import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ConnectionPageComponent } from './connection-page/connection-page.component'
import { ConnectionModule } from '../connection/connection.module';
import { FormsModule } from '@angular/forms';
import { LivreModule } from '../livre/livre.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConnectionModule,
    LivreModule
  ],
  declarations: [
    ConnectionPageComponent
  ],
  exports : [
    ConnectionPageComponent
  ]
})
export class PagesComponentsModule { }
