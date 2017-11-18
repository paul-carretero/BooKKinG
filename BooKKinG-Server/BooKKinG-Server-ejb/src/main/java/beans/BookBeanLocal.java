package beans;

import javax.ejb.Local;

import JsonItf.BookListJsonItf;
import JsonItf.BookSearchJsonItf;
import entities.BookEntity;

@Local
public interface BookBeanLocal {

	public BookEntity getBook(Integer idBook);

	public void getBooks(BookSearchJsonItf searchData,BookListJsonItf response);

}
