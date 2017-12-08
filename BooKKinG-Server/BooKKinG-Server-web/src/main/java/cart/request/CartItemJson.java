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

	public CartItemJson() {
		super();
	}

	/**
	 * @param idBook
	 * @param quantity
	 */
	public CartItemJson(int idBook, int quantity) {
		super();
		this.idBook = idBook;
		this.quantity = quantity;
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
		System.out.println(this.quantity);
	}
}
