package response;

import shared.AbstractJson;

public class BookListJson extends AbstractJson {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3258017333213392628L;
	
	private BookJson[] bookList;

	/**
	 * @param bookList
	 */
	public BookListJson(BookJson[] bookList) {
		super();
		this.bookList = bookList;
	}

	

}
