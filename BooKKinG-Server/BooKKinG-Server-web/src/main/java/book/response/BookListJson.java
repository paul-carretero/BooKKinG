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
	
	@SuppressWarnings("unused")
	private int pagesAvailable;
	
	@SuppressWarnings("unused")
	private int resultsAvailable;

	/**
	 * default constructor
	 */
	public BookListJson() {
		super();
		this.books = new ArrayList<>();
		this.pagesAvailable = 1;
	}

	@Override
	public BookJsonItf prepareNewEntry(){
		BookJson res = new BookJson();
		this.books.add(res);
		return res;
	}
	
	@Override
	public void setTotalAvailable(final int n) {
		this.resultsAvailable = n;
	}
	
	@Override
	public void setTotalPageAvailable(final int n) {
		this.pagesAvailable = n;
	}
}
