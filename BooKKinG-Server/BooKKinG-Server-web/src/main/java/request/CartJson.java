package request;

import JsonItf.CartJsonItf;
import shared.AbstractJson;

public class CartJson  extends AbstractJson implements CartJsonItf {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 2131990500946912748L;

	private Integer idBook;
	
	private Integer quantity;

	public CartJson() {
		super();
	}

	/**
	 * @param idBook
	 * @param quantity
	 */
	public CartJson(Integer idBook, Integer quantity) {
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
