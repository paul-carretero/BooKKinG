package beans;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import JsonItf.BookJsonItf;
import JsonItf.BookListJsonItf;
import JsonItf.BookSearchJsonItf;
import entities.BookEntity;
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
	public void getBooks(final BookSearchJsonItf searchData, final BookListJsonItf response){
    	System.out.println(searchData.getGenres());
		List<BookEntity> books = this.manager.createQuery(
				" FROM BookEntity b WHERE "
				+ "(b.type = :type OR :type = 'ANY')"
				+ " AND (b.price >= :minprice OR :minprice <= 0)"
				+ " AND (b.price <= :maxprice OR :maxprice <= 0)"
				+ " AND (b.title LIKE :title OR b.author LIKE :author)")
				.setParameter("type", searchData.getTypes())
				.setParameter("minprice", Float.valueOf(searchData.getMinPrice()))
				.setParameter("maxprice", Float.valueOf(searchData.getMaxPrice()))
				.setParameter("type", searchData.getTypes())
				.setParameter("title", "%"+searchData.getTitle()+"%")
				.setParameter("author", "%"+searchData.getAuthor()+"%")
				.getResultList();
		
		List<Genre> allowedGenre = searchData.getGenres();
		for(BookEntity book : books) {
			if(allowedGenre == null || allowedGenre.contains(book.getGenre())) {
				BookJsonItf entry = response.prepareNewEntry();
				entry.setField(book);
			}
		}
    }

}
