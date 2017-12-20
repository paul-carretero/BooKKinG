package cart.entity;

import book.entity.BookEntItf;
import user.entity.UserEntItf;

/**
 * représente l'interface publique d'une entité représentant une entrée d'un panier utilisateur
 */
public interface CartDetailEntItf {

	/**
	 * @return un utilisateur associé à cette entrée de panier
	 */
	public UserEntItf getUser();

	/**
	 * @return le livre de cette entrée panier
	 */
	public BookEntItf getBook();

	/**
	 * @return la quantité du livre de cette entrée panier
	 */
	public int getQuantity();

}