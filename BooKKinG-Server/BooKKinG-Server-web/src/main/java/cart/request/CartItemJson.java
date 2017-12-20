package cart.request;

import cart.dataItf.CartItemJsonItf;
import shared.AbstractJson;
import shared.Validifyable;

/**
 * représente une entrée des livres dans un panier utilisateur (envoyé au serveur)
 */
@SuppressWarnings("unused")
public class CartItemJson  extends AbstractJson implements CartItemJsonItf, Validifyable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 2131990500946912748L;

	/**
	 * id du livre dans le panier utilisateur
	 */
	private int idBook;
	
	/**
	 * quantité de ce livre dans le panier
	 */
	private int quantity;
	
	/**
	 * vrai si le livre est en stock, faux sinon
	 */
	private boolean isInStock = true;

	/**
	 * default constructor
	 */
	public CartItemJson() {
		super();
	}

	/**
	 * @param idBook
	 * @param quantity
	 */
	public CartItemJson(final int idBook, final int quantity) {
		super();
		this.idBook		= idBook;
		this.quantity 	= quantity;
	}

	/**
	 * instancie une entrée d'un panier
	 * @param idBook id du livre
	 * @param quantity quantité du livre
	 * @param isInStock vrai si le livre est en stock, faux sinon
	 */
	public CartItemJson(final int idBook, final int quantity, final boolean isInStock) {
		super();
		this.idBook 	= idBook;
		this.quantity 	= quantity;
		this.isInStock 	= isInStock;
	}

	@Override
	public int getIdBook() {
		return this.idBook;
	}

	@Override
	public int getQuantity() {
		return this.quantity;
	}

	@Override
	public void validify() {
		// nothing to do
	}
}
