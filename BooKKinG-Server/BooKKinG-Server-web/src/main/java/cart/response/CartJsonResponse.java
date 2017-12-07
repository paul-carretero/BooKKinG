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

	/**
	 * idBook=>quantity
	 */
	private Set<Article> articles;

	public CartJsonResponse() {
		super();
		this.articles = new HashSet<>();
	}

	@Override
	public void addBook(BookEntItf aBook, Integer quantity) {
		this.articles.add(new Article(new BookJson(aBook), quantity, aBook.getIdBook()));
	}

}
