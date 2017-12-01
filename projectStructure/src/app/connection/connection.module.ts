import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ConnectionService } from './connection.service';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpModule,
    FormsModule,    
  ],
  declarations: [
    ConnectionFormComponent,
    FormInscriptionComponent
  ],
  exports : [
    ConnectionFormComponent,
    FormInscriptionComponent
  ],
  providers : [
    ConnectionService 
  ]
})
export class ConnectionModule { }
