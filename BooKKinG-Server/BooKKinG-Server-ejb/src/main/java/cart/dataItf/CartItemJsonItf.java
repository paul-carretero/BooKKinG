package cart.dataItf;

/**
 * représente une entrée du panier d'un utilisateur
 */
public interface CartItemJsonItf {

	/**
	 * @return l'id du livre de cette entrée
	 */
	public int getIdBook();

	/**
	 * @return la quantité de ce livre
	 */
	public int getQuantity();

}