import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  SharedModule
} from './shared/shared.module';

import { RouterModule, Routes } from '@angular/router';
//import { ResearchComponent } from './research/research.component';
//import { HomeComponent } from './home/home.component';
import {
  PagesComponentsModule,
  
} from './pages-components/pages-components.module'
import { HeaderComponent } from './shared/header/header.component';
import { TemplateComponent } from './shared/template/template.component';
import { ConnectionPageComponent } from './pages-components/connection-page/connection-page.component';
import { FormsModule } from '@angular/forms';



export const appRoutes: Routes = [
  /*
  {
    path :'',
      children : [
        {path : '' , component : TemplateComponent},
        {path : 'research', component : ResearchComponent}
        
      ],
      component : TemplateComponent
  },
  {path : 'home', component : HomeComponent}
  
  {path : 'home', component : HomeComponent},
  {path : 'research', component : ResearchComponent}
  */
  {path : 'connection', component : ConnectionPageComponent}
  
]

  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    PagesComponentsModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, {useHash : true})
  ],
  providers: [
    
/*    
    BookService,
    CartDetailService,
    CmdDetailService,
    CommandService,
    GenreService,
    TypeService,
    UserService
*/  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
