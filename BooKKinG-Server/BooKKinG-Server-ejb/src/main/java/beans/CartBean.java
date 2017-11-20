package beans;

import java.util.List;

import javax.ejb.Asynchronous;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import JsonItf.CartItemJsonItf;
import JsonItf.CartJsonResponseItf;
import entities.BookEntity;
import entities.CartDetailEntity;
import entities.CartDetailId;

/**
 * Session Bean implementation class CartBean
 */
@Stateless
@LocalBean
public class CartBean implements CartBeanLocal {

	@PersistenceContext()
	private EntityManager manager;
	
	/**
	 * Bean User pour gestion des operations metiers sur un utilisateur
	 */
	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!beans.UserBeanLocal")
	UserBeanLocal user;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/BookBean!beans.BookBeanLocal")
	BookBeanLocal book;
	
    /**
     * Default constructor. 
     */
    public CartBean() {}

	@Override
	@Asynchronous
	public void clearCart(final Integer idUser) {
		List<CartDetailEntity> toDelete = this.user.getUser(idUser).getCart();
		
		for(CartDetailEntity entry : toDelete) {
			this.manager.remove(entry);
		}
	}

	@Override
	@Asynchronous
	public void setQuantity(final Integer idUser, final CartItemJsonItf data) {
		CartDetailEntity toUpdate = this.manager.find(CartDetailEntity.class, new CartDetailId(idUser,data.getIdBook()));
		if(data.getQuantity() <= 0 && toUpdate != null) {
			this.manager.remove(toUpdate);
		}
		else if(toUpdate == null && data.getQuantity() > 0) {
			BookEntity bookTry = this.book.getBook(data.getIdBook());
			if(bookTry != null) {
				toUpdate = new CartDetailEntity(this.user.getUser(idUser), bookTry, data.getQuantity());
				this.manager.persist(toUpdate);
			}
		}
		else if(toUpdate != null && data.getQuantity() > 0){
			toUpdate.setQuantity(data.getQuantity());
		}
	}

	@Override
	public void getCart(Integer idUser, CartJsonResponseItf response) {
		List<CartDetailEntity> userCart = this.user.getUser(idUser).getCart();	
		for(CartDetailEntity entry : userCart) {
			response.addBook(entry.getBook(), entry.getQuantity());
		}
	}
	
	@Override
	public boolean checkNoEmpty(Integer idUser) {
		List<CartDetailEntity> userCart = this.user.getUser(idUser).getCart();	
		return !userCart.isEmpty();
	}
}
