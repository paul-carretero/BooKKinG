import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './service/user.service';
import { CartDetailService } from './service/cart-detail.service';
import { CommandService } from './service/command.service';
import { BookService } from './service/book.service';
import { CmdDetailService } from './service/cmd-detail.service';
import { GenreService } from './service/genre.service';
import { TypeService } from './service/type.service';
import { BookListComponent } from './book-list/book-list.component';
import { CommandListComponent } from './command-list/command-list.component';
import { CategoryGenreComponent } from './category-genre/category-genre.component';
import { CategoryPriceComponent } from './category-price/category-price.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BookListComponent,
    CommandListComponent,
    CategoryGenreComponent,
    CategoryPriceComponent
  ],
  exports:[
    BookListComponent,
    CommandListComponent,
    CategoryGenreComponent,
    CategoryPriceComponent
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
