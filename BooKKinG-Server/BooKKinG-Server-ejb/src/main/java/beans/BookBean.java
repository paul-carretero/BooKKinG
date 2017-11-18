package beans;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.BookEntity;

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
	public BookEntity getBook(final int idBook){
		return this.manager.find(BookEntity.class, idBook);
	}

}
