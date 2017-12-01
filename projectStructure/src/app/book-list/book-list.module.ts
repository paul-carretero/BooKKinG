import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list.component';
import { BookService } from './book.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BookListComponent
  ],
  exports: [
    BookListComponent,    
  ],
  providers : [
    BookService
  ]
})
export class BookListModule { }
