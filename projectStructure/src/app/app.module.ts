import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  BookService,
  CartDetailService,
  CmdDetailService,
  CommandService,
  GenreService,
  TypeService,
  UserService,
  SharedModule,
  HeaderComponent
} from './shared';

import { RouterModule, Routes } from '@angular/router';
import { ResearchComponent } from './research/research.component';
import { ResearchModule } from './research/research.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

export const appRoutes: Routes = [
  /* 
  {
    path :'',
      children : [
        {path : 'research', component : ResearchComponent}
      ],
      component : AppComponent
  },
  {path : 'home', component : HomeComponent}
  */
  {path : 'home', component : HomeComponent},
  {path : 'research', component : ResearchComponent}
]

  
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ResearchModule,
    HomeModule,
    RouterModule.forRoot(appRoutes, {useHash : true})
  ],
  providers: [
    BookService,
    CartDetailService,
    CmdDetailService,
    CommandService,
    GenreService,
    TypeService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
