package beans;

import javax.ejb.Asynchronous;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import JsonItf.CartJsonItf;

/**
 * Session Bean implementation class CartBean
 */
@Stateless
@LocalBean
public class CartBean implements CartBeanLocal {

	@PersistenceContext()
	private EntityManager manager;
	
    /**
     * Default constructor. 
     */
    public CartBean() {
        // TODO Auto-generated constructor stub
    }

	@Override
	@Asynchronous
	public void clearCart(Integer idUser) {
		this.manager.createQuery("DELETE FROM CartDetail WHERE idUser=:idUser")
		.setParameter("idUser", idUser)
		.executeUpdate();
	}

	@Override
	@Asynchronous
	public void setQuantity(Integer idUser, CartJsonItf data) {
		if(data.getQuantity() <= 0) {
			this.manager.createQuery("DELETE FROM CartDetail WHERE idUser=:idUser AND idBook=:idBook")
			.setParameter("idUser", idUser)
			.setParameter("amount", data.getQuantity())
			.setParameter("idBook", data.getIdBook())
			.executeUpdate();
		}
		else {
			this.manager.createQuery("UPDATE CartDetail SET quantity=:quantity  WHERE idUser=:idUser AND idBook=:idBook")
			.setParameter("idUser", idUser)
			.setParameter("amount", data.getQuantity())
			.setParameter("idBook", data.getIdBook())
			.executeUpdate();
		}
	}

	@Override
	public void getCart(Integer idUser) {
		// TODO Auto-generated method stub
		
	}

}
