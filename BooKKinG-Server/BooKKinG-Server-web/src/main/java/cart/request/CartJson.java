package cart.request;

import cart.dataItf.CartItemJsonItf;
import cart.dataItf.CartJsonItf;
import shared.AbstractJson;
import shared.Validifyable;

/**
 * représente le contenu d'un panier utilisateur émis par le client
 */
public class CartJson extends AbstractJson implements CartJsonItf, Validifyable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -5439224468396563278L;
	
	/**
	 * entrée du panier (livre et quantité)
	 */
	private CartItemJson[] items;

	/**
	 * default constructor
	 */
	public CartJson() {
		super();
	}

	@Override
	public CartItemJsonItf[] getItems() {
		return this.items;
}

	@Override
	public void validify() {
		if (this.items == null) {
			this.items = new CartItemJson[0];
		}
	}

}
