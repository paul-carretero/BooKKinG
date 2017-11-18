package request;

import JsonItf.CartItemJsonItf;
import shared.AbstractJson;

public class CartItemJson  extends AbstractJson implements CartItemJsonItf {
	
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
		return idBook;
	}

	@Override
	public Integer getQuantity() {
		return quantity;
	}


}
