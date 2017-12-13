package book.bean;

import javax.ejb.Local;

import book.dataItf.BookListJsonItf;
import book.dataItf.BookCreateDataItf;
import book.dataItf.BookSearchItf;
import book.dataItf.InitResponseJsonItf;
import book.entity.BookEntity;

@Local
public interface BookBeanLocal {

	public BookEntity getBook(Integer idBook);

	public void getBooks(BookSearchItf searchData,BookListJsonItf response);

	public void addBooks(BookCreateDataItf data);

	public void getRandom(InitResponseJsonItf response);

	public void getNewest(InitResponseJsonItf response);

	public void getMostBuy(InitResponseJsonItf response);

	public void getRange(InitResponseJsonItf response);

	int getMinForTest();

}
