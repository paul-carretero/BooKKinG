import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  SharedModule
} from './shared/shared.module';

import { RouterModule, Routes } from '@angular/router';
//import { ResearchComponent } from './research/research.component';
//import { HomeComponent } from './home/home.component';
import {PagesComponentsModule} from './pages-components/pages-components.module'
import { ResearchComponent } from './pages-components/research/research.component';
import { HomeComponent } from './pages-components/home/home.component';
import { CategoryGenreComponent } from './category-genre/category-genre.component';
import { CategoryGenreModule } from './category-genre/category-genre.module';
import { HeaderComponent } from './shared/header/header.component';
import { TemplateComponent } from './shared/template/template.component';

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
  */
  {path : 'home', component : HomeComponent},
  {path : 'research', component : ResearchComponent}
  
]

  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CategoryGenreModule,
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
