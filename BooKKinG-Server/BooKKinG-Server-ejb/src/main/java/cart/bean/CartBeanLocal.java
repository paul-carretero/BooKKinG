package cart.bean;

import javax.ejb.Local;

import cart.dataItf.CartItemJsonItf;
import cart.dataItf.CartJsonResponseItf;

@Local
public interface CartBeanLocal {

	public void clearCart(int idUser);
		
	public void setQuantity(int idUser, CartItemJsonItf data);

	public void getCart(int idUser, CartJsonResponseItf response);

	public boolean checkNoEmpty(int idUser);

	public void synchClearCart(int idUser);
}
