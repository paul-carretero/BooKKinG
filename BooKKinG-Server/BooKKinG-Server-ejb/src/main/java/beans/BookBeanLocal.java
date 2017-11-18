package beans;

import javax.ejb.Local;

import entities.BookEntity;

@Local
public interface BookBeanLocal {

	public BookEntity getBook(int idBook);

}
