import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';
import { UrlService } from './url.service';



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
  ],

  providers: [
    UrlService
  ]
 
})
export class SharedModule { }
