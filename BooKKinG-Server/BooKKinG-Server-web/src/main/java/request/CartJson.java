package request;

import shared.AbstractJson;

public class CartJson  extends AbstractJson {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 2131990500946912748L;
	
	/**
	 * Integer[n][2] première colone : id book, seconde quantité
	 */
	protected Integer[][] BooksQuantity;

	public CartJson() {
		super();
	}

	/**
	 * @param BooksQuantity
	 */
	public CartJson(Integer[][] BooksQuantity) {
		super();
		this.BooksQuantity = BooksQuantity;
	}

}
