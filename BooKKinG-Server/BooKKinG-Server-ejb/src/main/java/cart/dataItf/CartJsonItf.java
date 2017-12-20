package cart.dataItf;

/**
 * représente des données en entrée d'un nouveau panier utilisateur
 */
public interface CartJsonItf {

	/**
	 * @return un tableau contennt les élément du panier d'un utilisateur
	 */
	public CartItemJsonItf[] getItems();

}