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
import entities.CartDetailEntity;

/**
 * Session Bean implementation class CartBean
 */
@Stateless
@LocalBean
public class CartBean implements CartBeanLocal {

	@PersistenceContext()
	private EntityManager manager;
	
	@EJB(lookup="java:app/BooKKinG-Server-ejb/UserBean!beans.UserBeanLocal")
	UserBeanLocal user;
	
    /**
     * Default constructor. 
     */
    public CartBean() {}

	@Override
	@Asynchronous
	public void clearCart(final Integer idUser) {
		this.manager.createQuery("DELETE FROM CartDetail WHERE idUser=:idUser")
		.setParameter("idUser", idUser)
		.executeUpdate();
	}

	@Override
	@Asynchronous
	public void setQuantity(final Integer idUser, final CartItemJsonItf data) {
		if(data.getQuantity() <= 0) {
			this.manager.createQuery("DELETE FROM CartDetail WHERE idUser=:idUser AND idBook=:idBook")
			.setParameter("idUser", idUser)
			.setParameter("amount", data.getQuantity())
			.setParameter("idBook", data.getIdBook())
			.executeUpdate();
		}
		else {
			this.manager.createQuery(
					"INSERT INTO CartDetail(idBook, idUser, quantity) VALUES(:idBook, :idUser, :quantity)"
					+"ON DUPLICATE KEY UPDATE CartDetail SET quantity=:quantity  WHERE idUser=:idUser AND idBook=:idBook"
					)
			.setParameter("idUser", idUser)
			.setParameter("amount", data.getQuantity())
			.setParameter("idBook", data.getIdBook())
			.executeUpdate();
		}
	}

	@Override
	public void getCart(Integer idUser, CartJsonResponseItf response) {
		List<CartDetailEntity> userCart = this.user.getUser(idUser).getCart();	
		for(CartDetailEntity entry : userCart) {
			response.addBook(entry.getBook(), entry.getQuantity());
		}
	}
}
