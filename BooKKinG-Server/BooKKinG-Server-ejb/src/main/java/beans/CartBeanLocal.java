package beans;

import javax.ejb.Local;

import JsonItf.CartItemJsonItf;
import JsonItf.CartJsonResponseItf;

@Local
public interface CartBeanLocal {

	public void clearCart(Integer idUser);
		
	public void setQuantity(Integer idUser, CartItemJsonItf data);

	public void getCart(Integer idUser, CartJsonResponseItf response);

	public boolean checkNoEmpty(Integer idUser);
}
