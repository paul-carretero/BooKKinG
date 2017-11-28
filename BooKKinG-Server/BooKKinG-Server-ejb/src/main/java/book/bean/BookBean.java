package book.bean;

import java.util.List;

import javax.ejb.Asynchronous;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import book.dataItf.BookJsonItf;
import book.dataItf.BookListJsonItf;
import book.dataItf.BookCreateDataItf;
import book.dataItf.BookSearchItf;
import book.entity.BookEntity;
import shared.Genre;

/**
 * Session Bean implementation class BookBean
 */
@Stateless
@LocalBean
public class BookBean implements BookBeanLocal {

	@PersistenceContext()
	private EntityManager manager;
	
    /**
     * Default constructor. 
     */
    public BookBean() {}
    
    @Override
	public BookEntity getBook(final Integer idBook){
		return this.manager.find(BookEntity.class, idBook);
	}
    
    @Override
	public void getBooks(final BookSearchItf searchData, final BookListJsonItf response){
		List<BookEntity> books = this.manager.createQuery(
				" FROM BookEntity b WHERE "
				+ "(b.type = :type OR :type = 'ANY')"
				+ " AND (b.price >= :minprice OR :minprice <= 0)"
				+ " AND (b.price <= :maxprice OR :maxprice <= 0)"
				+ " AND (b.title LIKE :title OR b.author LIKE :author)")
				.setParameter("type", searchData.getType())
				.setParameter("minprice", Float.valueOf(searchData.getMinPrice()))
				.setParameter("maxprice", Float.valueOf(searchData.getMaxPrice()))
				.setParameter("type", searchData.getType())
				.setParameter("title", "%"+searchData.getTitle()+"%")
				.setParameter("author", "%"+searchData.getAuthor()+"%")
				.getResultList();
		
		List<Genre> allowedGenre = searchData.getGenres();
		for(BookEntity book : books) {
			if(allowedGenre.isEmpty() || allowedGenre.contains(book.getGenre())) {
				BookJsonItf entry = response.prepareNewEntry();
				entry.setField(book);
			}
		}
    }

	@Override
	@Asynchronous
	public void addBooks(BookCreateDataItf data) {
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
