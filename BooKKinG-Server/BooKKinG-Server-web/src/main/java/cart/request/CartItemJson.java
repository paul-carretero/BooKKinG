package cart.request;

import cart.dataItf.CartItemJsonItf;
import shared.AbstractJson;
import shared.Validifyable;

public class CartItemJson  extends AbstractJson implements CartItemJsonItf, Validifyable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 2131990500946912748L;

	private Integer idBook;
	
	private Integer quantity;
	
	@SuppressWarnings("unused")
	private boolean isInStock = true;

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

	public CartItemJson(final int idBook, final int quantity, final boolean isInStock) {
		super();
		this.idBook 	= idBook;
		this.quantity 	= quantity;
		this.isInStock 	= isInStock;
	}

	@Override
	public Integer getIdBook() {
		return this.idBook;
	}

	@Override
	public Integer getQuantity() {
		return this.quantity;
	}

	@Override
	public void validify() {
		if (this.idBook == null) {
			this.idBook = 0;
		}
		if (this.quantity == null) {
			this.quantity = 0;
		}
	}
}
