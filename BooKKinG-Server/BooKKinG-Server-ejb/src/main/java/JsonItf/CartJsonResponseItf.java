package JsonItf;

import localItf.BookEntItf;

public interface CartJsonResponseItf extends GenericResponseJsonItf {

	public void addBook(BookEntItf aBook, Integer quantity);

}