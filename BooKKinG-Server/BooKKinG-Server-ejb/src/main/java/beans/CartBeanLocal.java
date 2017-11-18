package beans;

import javax.ejb.Local;

import JsonItf.CartJsonItf;

@Local
public interface CartBeanLocal {

	public void clearCart(Integer idUser);
		
	public void getCart(Integer idUser);

	public void setQuantity(Integer idUser, CartJsonItf data);
}
