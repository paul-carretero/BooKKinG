import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService} from './panier.service'
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [

  ],
  providers : [
    PanierService
  ]
})
export class PanierModule { }
