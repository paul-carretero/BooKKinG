import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPriceComponent } from './category-price.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CategoryPriceComponent
  ],
  exports:[
    CategoryPriceComponent
  ]
})
export class CategoryPriceModule { }
