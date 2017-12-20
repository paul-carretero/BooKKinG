package cart.bean;

import javax.ejb.Local;

import cart.dataItf.CartItemJsonItf;
import cart.dataItf.CartJsonResponseItf;

/**
 * interface local réprésentant un bean permettant de réaliser des opérations métier sur des panier d'utilisateur
 */
@Local
public interface CartBeanLocal {

	/**
	 * vide le panier d'un utilisateur de manière asynchrone
	 * @param idUser id d'un utilsiateur
	 */
	public void clearCart(int idUser);
	
	/**
	 * vide le panier d'un utilisateur de manière synchrone
	 * @param idUser id d'un utilsiateur
	 */
	public void synchClearCart(int idUser);
		
	/**
	 * met à jour le panier d'un utilisateur
	 * @param idUser id d'un utilisateur
	 * @param data nouvelle donnée d'une entrée panier pour un utilisateur
	 */
	public void setQuantity(int idUser, CartItemJsonItf data);

	/**
	 * permet de récupérer le panier d'un utilisateur
	 * @param idUser l'id d'un utilisateur
	 * @param response une réponse permettant de stocker le contenu d'un panier utilisateur
	 */
	public void getCart(int idUser, CartJsonResponseItf response);

	/**
	 * @param idUser l'id d'un utilisateur
	 * @return true si le panier d'un utilisateur est vide, faux sinon
	 */
	public boolean checkNoEmpty(int idUser);

	
}
