package book.response;

import java.util.ArrayList;
import java.util.List;

import book.dataItf.BookJsonItf;
import book.dataItf.BookListJsonItf;
import shared.GenericResponseJson;

public class BookListJson extends GenericResponseJson implements BookListJsonItf {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3258017333213392628L;
	
	private List<BookJson> books;

	/**
	 * default constructor
	 */
	public BookListJson() {
		super();
		this.books = new ArrayList<>();
	}

	@Override
	public BookJsonItf prepareNewEntry(){
		BookJson res = new BookJson();
		this.books.add(res);
		return res;
	}
}
