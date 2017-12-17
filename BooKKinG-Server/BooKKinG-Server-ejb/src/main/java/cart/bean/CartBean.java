package cart.bean;

import java.util.List;

import javax.ejb.Asynchronous;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;

import book.bean.BookBeanLocal;
import book.entity.BookEntity;
import cart.dataItf.CartItemJsonItf;
import cart.dataItf.CartJsonResponseItf;
import cart.entity.CartDetailEntity;
import cart.entity.CartDetailId;
import shared.AbstractBean;
import user.bean.UserBeanLocal;

/**
 * Session Bean implementation class CartBean
 */
@Stateless
@LocalBean
public class CartBean extends AbstractBean implements CartBeanLocal {
	
	/**
	 * Bean User pour gestion des operations metiers sur un utilisateur
	 */
	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!user.bean.UserBeanLocal")
	private UserBeanLocal user;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/BookBean!book.bean.BookBean")
	private BookBeanLocal book;
	
    /**
     * Default constructor. 
     */
    public CartBean() {}

	@Override
	public void synchClearCart(final int idUser) {
		List<CartDetailEntity> toDelete = this.user.getUser(idUser).getCart();
		
		for(CartDetailEntity entry : toDelete) {
			this.manager.remove(entry);
		}
	}
	
	@Override
	@Asynchronous
	public void clearCart(final int idUser) {
		List<CartDetailEntity> toDelete = this.user.getUser(idUser).getCart();
		
		for(CartDetailEntity entry : toDelete) {
			this.manager.remove(entry);
		}
	}

	@Override
	public void setQuantity(final int idUser, final CartItemJsonItf data) {
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
	public void getCart(int idUser, CartJsonResponseItf response) {
		List<CartDetailEntity> userCart = this.user.getUser(idUser).getCart();	
		for(CartDetailEntity entry : userCart) {
			response.addBook(entry.getBook(), entry.getQuantity());
		}
	}
	
	@Override
	public boolean checkNoEmpty(int idUser) {
		List<CartDetailEntity> userCart = this.user.getUser(idUser).getCart();	
		return !userCart.isEmpty();
	}
}
