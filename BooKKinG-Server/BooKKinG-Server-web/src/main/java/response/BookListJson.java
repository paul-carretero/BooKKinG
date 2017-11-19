package response;

import java.util.ArrayList;
import java.util.List;

import JsonItf.BookJsonItf;
import JsonItf.BookListJsonItf;

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
