import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component'
import { ResearchComponent } from './research/research.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryGenreModule } from '../category-genre/category-genre.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CategoryGenreModule
  ],
  declarations: [
    HomeComponent,
    ResearchComponent
  ]
})
export class PagesComponentsModule { }
