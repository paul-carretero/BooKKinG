package response;

import request.CartJson;

public class CartJsonResponse extends CartJson {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6039853953724021342L;
	
	/**
	 * Liste des livres du panier
	 */
	protected BookListJson books;
	
	public CartJsonResponse(Integer[][] tc, BookListJson books) {
		super(tc);
		this.books = books;
	}


}
