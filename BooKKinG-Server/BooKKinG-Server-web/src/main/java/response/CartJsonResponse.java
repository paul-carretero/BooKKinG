package response;

import java.util.HashMap;
import java.util.Map;

import JsonItf.CartJsonResponseItf;
import localItf.BookEntItf;
import shared.AbstractJson;

public class CartJsonResponse extends AbstractJson implements CartJsonResponseItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6039853953724021342L;

	/**
	 * idBook=>quantity
	 */
	private Map<Integer,Integer> quantities;

	/**
	 * idBook => JsonBook
	 */
	private Map<Integer,BookJson> books;

	public CartJsonResponse() {
		super();
		this.books 		= new HashMap<>();
		this.quantities = new HashMap<>();
	}

	@Override
	public void addBook(BookEntItf aBook, Integer quantity) {
		if(!this.quantities.containsKey(aBook.getIdBook())) {
			this.quantities.put(aBook.getIdBook(), quantity);
			this.books.put(aBook.getIdBook(), new BookJson(aBook));
		}
		else {
			this.quantities.put(aBook.getIdBook(), quantity);
		}
	}

}
