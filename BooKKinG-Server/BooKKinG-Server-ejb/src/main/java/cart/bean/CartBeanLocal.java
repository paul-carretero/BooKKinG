package cart.bean;

import javax.ejb.Local;

import cart.dataItf.CartItemJsonItf;
import cart.dataItf.CartJsonResponseItf;

@Local
public interface CartBeanLocal {

	public void clearCart(Integer idUser);
		
	public void setQuantity(Integer idUser, CartItemJsonItf data);

	public void getCart(Integer idUser, CartJsonResponseItf response);

	public boolean checkNoEmpty(Integer idUser);

	public void synchClearCart(Integer idUser);
}
