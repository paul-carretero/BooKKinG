package response;

import shared.AbstractJson;

public class CartJsonResponse extends AbstractJson {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6039853953724021342L;
	
	/**
	 * Integer[n][2] première colone : id book, seconde quantité
	 */
	protected Integer[][] BooksQuantity;
	
	/**
	 * Liste des livres du panier
	 */
	protected BookListJson books;
	
	public CartJsonResponse(int numberOfEntries, BookListJson books) {
		super();
		this.books 			= books;
		this.BooksQuantity 	= new Integer[numberOfEntries][2];
	}


}
