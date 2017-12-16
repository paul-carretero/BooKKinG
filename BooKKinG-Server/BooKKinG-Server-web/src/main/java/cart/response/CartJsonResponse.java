package cart.response;

import java.util.HashSet;
import java.util.Set;

import book.entity.BookEntItf;
import book.response.BookJson;
import cart.dataItf.CartJsonResponseItf;
import shared.GenericResponseJson;

public class CartJsonResponse extends GenericResponseJson implements CartJsonResponseItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6039853953724021342L;

	private Set<Article> items;

	public CartJsonResponse() {
		super();
		this.items = new HashSet<>();
	}

	@Override
	public void addBook(BookEntItf aBook, int quantity) {
		this.items.add(new Article(new BookJson(aBook), quantity, aBook.getIdBook()));
	}

}
