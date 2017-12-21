package book.bean;

import java.util.List;

import javax.ejb.Asynchronous;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.Query;

import book.dataItf.BookJsonItf;
import book.dataItf.BookListJsonItf;
import book.dataItf.BookCreateDataItf;
import book.entity.BookEntity;
import shared.AbstractBean;

/**
 * Session Bean implementation class BookBean
 * Gère les opérations sur les livres
 */
@Stateless
@LocalBean
public class BookBean extends AbstractBean implements BookBeanLocal {
	
	/**
	 * Default constructor. 
	 */
	public BookBean() {}

	@Override
	public BookEntity getBook(final int idBook){
		return this.manager.find(BookEntity.class, idBook);
	}
	
	/**
	 * met à jour le stock d'un livre
	 * @param data données représentant un livre
	 */
	private void updateBook(BookCreateDataItf data) {
		BookEntity b = getBook(data.getIdBook());
		if(b != null) {
			b.setStock(data.getStock());
		}
	}

	@Override
	@Asynchronous
	public void addBooks(BookCreateDataItf data) {
		if(data.getIdBook() != 0) {
			updateBook(data);
		}
		else {
			BookEntity newBook = new BookEntity(
					data.getGenre(), 
					data.getType(), 
					data.getAuthor(), 
					data.getSummary(), 
					data.getPicture(), 
					data.getPrice(), 
					data.getStock(), 
					data.getTitle()
					);
			this.manager.persist(newBook);
		}
	}

	@Override
	public void getAllBooks(BookListJsonItf res) {
		Query searchBookQuery = this.manager.createQuery("FROM BookEntity b ORDER BY b.title ASC");
		List<BookEntity> books = searchBookQuery.getResultList();
		for(BookEntity book : books) {
			BookJsonItf entry = res.prepareNewEntry();
			entry.setField(book.getIdBook(),book.getTitle(),book.getStock());
		}
	}
}
