import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,    
    TemplateComponent
  ],
  exports:[
    HeaderComponent,
    TemplateComponent
  ]
  /*
  providers: [
    UserService, 
    CartDetailService, 
    CommandService, 
    BookService, 
    CmdDetailService, 
    GenreService, 
    TypeService
  ]
  */
})
export class SharedModule { }
